import React, { Component, Fragment, createRef } from "react";
import { Link, Redirect } from "react-router-dom";

import "./main.css";
import VideoCameraBackIcon from "@material-ui/icons/VideoCameraBack";
// import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import MoodIcon from "@material-ui/icons/Mood";
import Button from "@material-ui/core/Button";
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import AvatarGroup from "@material-ui/core/AvatarGroup";
// import { data } from "../../Data/posts";
// import Post from "./post";
import Posts from "./posts";

import Dialog from "./Dialog";
import Header from "../header";
// import Footer from "../footer";
import DialogContent from "./dialogContent";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors'


import {
  isLoggedIn,
  logOut,
  getPosts,
  addPost,
  likePost,
  deleteUserPost,
  changeProfile,
  addComment,
  getProfile,
  mostPopular,
  removeMostPopular,
  bookmarkPost
} from "../../store/actions/index";

import Sidebar from "./sidebar";
import BottomNavbar from "./bottomNav";
import PeopleToFollow from "./toFollow";
import { toast } from "react-toastify";

class AppIndexPage extends Component {
  state = {
    open: false,
    type: "text",
    userComment: "",
    // liked: false,
    userPost: {
      file: null,
      postType: "",
      video: "",
      videos: [],
      image: "",
      photos: [],

      description: "",
      user: {
        id: "",
        name: "",
        image: "",
        email: ""
      },

      likes: [],
      comments: []
    },
    upload: [],
    selectedFile: false,
    // loadmore variables
    page :1,
    itemsPerPage: 4
    
    
   
  };
  constructor(props) {
    super(props);
    this.myref = createRef();
  }
  componentDidMount = async () => {
    this.props.isLoggedIn();
    this.props.mostPopular();
    if (this.props.loggedIn) {
      this.props.getPosts();
      this.props.getProfile(this.props.user.uid, this.props.user.displayName);
      await this.props.mostPopular();
      
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {

      console.log("hi lall")
      
    }
  }

  handleClickOpen = e => {
    this.setState({
      open: true,
      type: e.target.getAttribute("data-type")
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = ({ currentTarget }) => {
    const postCopy = { ...this.state.userPost };
    postCopy[currentTarget.name] = currentTarget.value;
    this.setState({ userPost: postCopy });
    const srcs = [...this.state.upload];
    if (currentTarget.files !== null) {
      srcs.push(currentTarget.files);
      this.setState({ upload: srcs[0] });
    }
  };

  like = id => {
    // user can only like once
    const { displayName, email, photoURL, uid } = this.props.user;
    const user = { displayName, email, photoURL, uid };
    this.props.likePost(id, user);
  };

  commentTextChange = ({ currentTarget }) => {
    this.setState({ userComment: currentTarget.value });
  };

  handleChangeProfilePic = ({ currentTarget }) => {
    const user = this.props.user;
    if (currentTarget.files !== null) {
      for (const file of currentTarget.files) {
        this.props.changeProfile(user, file);
      }
      // this.props.getProfile(this.props.user.uid, this.props.user.displayName);
    }
  };

  comment = e => {
    e.preventDefault();
    // add to db
    const userComment = {
      displayName: this.props.user.displayName,
      text: this.state.userComment,
      uid: this.props.user.uid,
      image: this.props.user.photoURL,
      reply: [],
      likes: [],
      date:Date.now()
    };

    this.props.addComment(e.currentTarget.getAttribute("data-id"), userComment);
    this.setState({ userComment: "" });
  };
  post = e => {
    e.preventDefault();
    const user = {
      id: this.props.user.uid,
      name: this.props.user.displayName,
      image: this.props.user.photoURL,
      email: this.props.user.email
    };
    // post
    const postCopy = { ...this.state.userPost, user: user };
    console.log(postCopy)
    if(postCopy.description ==="" && postCopy.file ===null && postCopy.video ===""){
      
      toast.info("Please enter some text, upload an image or a video at least" )
    }else{
      this.props.addPost(postCopy, this.state.type, this.state.upload);
    }
   
    // clear post  object
  };
  handlePostOption = e => {
    const postCopy = {
      ...this.state.userPost,
      postType: e.currentTarget.getAttribute("data-option")
    };
    this.setState({ userPost: postCopy });
  };
  // delete user posted post
  deleteUserPost = (postId, userId) => {
    this.props.deleteUserPost(postId, userId);
  };
  handleRemove = async  (popular, index)=>{     
    await this.props.removeMostPopular(popular, index)   

  }
  bookmark = (post)=>{
   console.log(this.props.user.id)
  
    this.props.bookmarkPost(post,this.props.user.uid)
  }


  loadMore = () =>{

    alert("Loaded")
    
      this.setState({
        page: this.state.page + 1,
        itemsPerPage: this.state.itemsPerPage + 5
      });
    
  }

  render() {
    if (!this.props.loggedIn) {
      // Redirect
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { referrer: "/home" }
          }}
        />
      );
    }
    return (
      <Fragment>
        <Header
          user={this.props.user}
          loggedIn={this.props.loggedIn}
          logout={this.props.logout}
        />

        <div style={{ paddingTop: ' 80px' }} className="wrapAll">
          <div className="container">
            <div className="row py-3   border-bottom justify-content-center p-2 mb-5 ">
              <div className="col-md-3" style={{ color: "#fefefe" }}>
                {/* left  side content */}
                <Sidebar
                  changeDisplay={this.handleChangeProfilePic}
                  display={this.props.user && this.props.user.displayName}
                  user={this.props.user && this.props.user}
                  profilePic={
                    this.props.profile &&
                    this.props.profile.user &&
                    this.props.profile.user.photoURL
                  }
                />
              </div>
              {/* Main content */}
              <div className="col-sm-12 col-md-6 col-12  app-contents">
                <div
                  className=" post-media-content-wrapper    p-3 d-flex flex-column rounded
              
              "
                  style={{ background: "#14102f", borderTop: "#2c2753" }}
                >
                  <div className="mb-3 d-flex ">
                    <span className="align-self-center mr-2">
                      <Avatar src={this.props.user.photoURL} />
                    </span>
                    <span className="flex-grow-1 ml-2">
                      <input
                        onFocus={this.handleClickOpen}
                        data-type="post"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={this.handleClickOpen}
                        className="form-control-lg border-0"
                        placeholder="what's on your mind?"
                      />
                    </span>
                  </div>
                  <div className="post-media py-2 " style={{ borderTop: "solid 1px rgb(44 39 83)" }}>
                    <div className="post-media-items d-flex justify-content-between">
                      <Button
                        color="secondary"
                        data-type="video"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={this.handleClickOpen}
                        style={{
                          borderRadius: "10px",
                          border: "none"
                        }}
                        className="rounded-pill camera mt-1 tn btn-light mt-1 flex-fill"
                        variant="outlined"
                        startIcon={<VideoCameraBackIcon />}
                      >
                        Video
                      </Button>
                      <Button
                        color="secondary"
                        data-type="photo"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={this.handleClickOpen}
                        style={{ borderRadius: "10px", border: "none" }}
                        className="rounded-pill photo mt-1 tn btn-light mt-1 flex-fill"
                        variant="outlined"
                        startIcon={<i class="fas fa-photo-video"></i>}
                      >
                        Photo
                      </Button>
                      <Button
                        color="secondary"
                        data-type="Feeling"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={this.handleClickOpen}
                        style={{ border: "none" }}
                        className="rounded-pill mood mt-1 tn btn-light mt-1 flex-fill"
                        variant="outlined"
                        startIcon={<MoodIcon color="danger" />}
                      >
                        Feeling
                      </Button>
                    </div>
                  </div>
                </div>
                {/* userlis slides hder */}
                <div className="feeder  p-3 rounded my-2" style={{ background:'#14102f'}}>
                  <Slider {...{
                    dots: true,
                  
                    
                    slidesToShow: 5,
                    }}>
                      {
                        [
                        { profile:"/profile/Jean Pierre",  
                          name: "Jean Pierre", url:"https://images.pexels.com/photos/3775168/pexels-photo-3775168.jpeg?auto=compress&cs=tinysrgb&w=800"},
                        { profile:"/profile/@John_Kret",  name: "John", url: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        {  profile:"/profile/Jean Pierre", name: "Trump", url: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        {  profile:"/profile/@Jean_Pierre", name: "Aman", url: "https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        {  profile:"/profile/@Xan_Pierre", name: "Xan", url: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800" },
                        { profile:"/profile/@Karl_Berry", 
                           name: "Berry", url: "https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=800" },

                        ].map((avatar)=>(
                          <div
                          key={avatar}
                           className="p-2 d-flex flex-column justify-content-center align-items-center">
                            <Link to={`${avatar.profile}`} className='d-flex flex-column align-items-center text-decoration-none'>
                              <Avatar src={avatar.url} sx={{ bgcolor: deepPurple[500] }} sx={{ width: 56, height: 56 }}>OP</Avatar>
                              <div style={{ color: "whitesmoke" }}>{avatar.name}</div>
                            </Link>
                            


                          </div>

                        ))
                      }
                    
                    
                    
                  </Slider>


                </div>
                <Posts
                  bookmark ={this.bookmark}
                  deleteUserPost={this.deleteUserPost}
                  user={this.props.user}
                  commentText={this.state.userComment}
                  commentTextChange={this.commentTextChange}
                  comment={this.comment}
                  like={this.like}
                  posts={this.props.posts}
                />

                <div className="loadmore-wrapper">

                  <div className="row ">
                    <div className="col-md-12">
                      <Button variant="outlined" className="load" onClick={this.loadMore}>Load More</Button>
                    </div>

                  </div>

                </div>
              </div>
              {/* maain content ends here */}

              {/* right side bar */}

              <div className="col-md-3">
                <div className="position-relative">
                  <div
                    style={{ position: 'fixed', color: '#f3f3f3', fontWeight: '500', fontFamily: "Inter, sans-serif;" }}
                    className="sidebar-main d-flex flex-column d-none d-md-block ">
                    <div className="d-flex flex-column">
                      <div className="d-flex flex-column">
                        <h2 className=" fs-4">Trendings</h2>
                        <div>
                          {
                            [{tag:"#love",count:69}].map((trend)=>(
                              <div className="d-flex justify-content-between">
                                <div className="p-2">
                                  <div>{trend.tag}</div>
                                  <div className="small" style={{ color:"rgb(105, 105, 109)"}}>{trend.count} people talking</div>
                                </div>
                                <div>
                                  <TrendingDownIcon />                                  
                                </div>
                               

                              </div>
                            ))
                          }
                        </div>
                      
                      </div>
                      <div>
                        <div className="d-flex align-items-baseline justify-content-between mt-2">
                          <h2 className="fs-5">People to follow</h2>
                          <Link to='/' className="btn btn-link">View more</Link>

                        </div>
                        
                        <div className="px-1">                       
                         
                          {
                            this.props.popularUserList && this.props.popularUserList.map((popular,index)=>(
                              <PeopleToFollow remove={()=>this.handleRemove(popular, index)} key={popular} popular={popular} />
                            ))
                          }
                        </div>


                      </div>

                    </div>

                  </div>
                </div>
              </div>
              {/* right sidebar ends here */}
            </div>
          </div>

          <Dialog type={this.state.type} title="Create Post">
            <DialogContent
              type={this.state.type}
              handlePostOption={this.handlePostOption}
              change={this.handleChange}
              post={this.post}
              userPost={this.state.userPost}
              selectedFile={this.state.selectedFile}
              upload={this.state.upload}
              user={this.props.user}
            />
          </Dialog>

          {/* display bottom nav on phone scree */}
          <div className="bottomNav mt-5">
            <BottomNavbar />
          </div>
        </div>
        {/* <Footer /> */}
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    user: state.user.user,
    posts: state.posts.posts,
    profile: state.profile,
    popularUserList: state.userActions.popularUsers
  };
}
export default connect(mapStateToProps, {
  isLoggedIn,
  getPosts,
  addPost,
  likePost,
  deleteUserPost,
  addComment,
  changeProfile,
  logOut,
  getProfile,
  mostPopular,
  removeMostPopular, bookmarkPost
})(AppIndexPage);
