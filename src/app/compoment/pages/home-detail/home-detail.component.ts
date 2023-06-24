import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StoryService} from "../../../service/story.service";
import {Story} from "../../../model/Story";
import {TokenService} from "../../../service/token.service";
import {SignInForm} from "../../../model/SignInForm";
import {SignUpForm} from "../../../model/SignUpForm";
import {Comments} from "../../../model/Comments";
import {CommentsService} from "../../../service/comments.service";
import {Likes} from "../../../model/Likes";
import {LikesService} from "../../../service/likes.service";
import {Chapter} from "../../../model/Chapter";

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss']
})
export class HomeDetailComponent implements OnInit {
  name = '';
  avatar = '';
  form: any = {};
  story?: Story;
  cmUser?:Comments;
  likeUser?:Likes;
  checkLogin = false;
  chapter?:Chapter;

  constructor(private activeRoute: ActivatedRoute,
              private storyService: StoryService,
              private tokenService: TokenService,
              private commentService:CommentsService,
              private likesService:LikesService,
              private router:Router) {
  }

  ngOnInit(): void {
    let storyId = this.activeRoute.snapshot.paramMap.get('id');
    // @ts-ignore
    let id = +storyId;
    this.storyService.getStoryById(id).subscribe(data => {
      this.story = data;
    })
    if (this.tokenService.getToken()) {
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
      this.checkLogin = true;
    }
  }

  protected readonly Story = Story;
  status ='';

  commentSubmit() {
    this.cmUser = new Comments(
      this.story,
      this.form.content
    )
    this.commentService.createComment(this.cmUser).subscribe(data=>{
      if (data.message == "create_success"){
        this.ngOnInit()
      }
    })
  }

  likeStory() {
    if (this.tokenService.getToken() == null){
      this.status = 'bạn cần đăng nhập để like'
    } else {
      this.likeUser = new Likes(
        this.story
      )
      this.likesService.createLikes(this.likeUser).subscribe(data=>{
        if (data.message == "like_success"){
          this.ngOnInit()
        } else if (data.message == "dame"){
          this.status = 'bạn đã like rồi'
        }
      })
    }

  }

  newChapter() {
      this.chapter = this.story?.chapterList[this.story?.chapterList.length-1];
      this.router.navigate(['/homeChapterImage/'+this.chapter?.id]);
  }

  stastChapter() {
    this.chapter = this.story?.chapterList[0];
    this.router.navigate(['/homeChapterImage/'+this.chapter?.id]);
  }
}
