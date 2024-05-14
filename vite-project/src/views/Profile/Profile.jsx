import { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { Card, Row, Col, Button } from "react-bootstrap";
import {
  getProfilePic,
  getUserByHandle,
  updateUserData,
} from "../../services/users.service";
import { uploadProfilePic } from "../../services/users.service";
import ProfilePic from "../../components/ProfilePic/ProfilePic";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/posts.service";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";
import { deletePostById } from "../../services/posts.service";

export default function Profile() {
  const { user, userData } = useContext(AppContext);
  const ref = useRef();
  const [profilePic, setProfilePic] = useState("img/default.jpg");
  const { handle } = useParams();
  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState([]);

  // Extract profile pic
  useEffect(() => {
    const fetchPic = async () => {
      try {
        const url = await getProfilePic(handle);
        setProfilePic(url);
      } catch (error) {
        console.error("Error fetching profile picture:", error.message);
      }
    };

    fetchPic();
  }, [handle]);

  //  Extract user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Handle:", handle);
        const dataSnapshot = await getUserByHandle(handle);
        const data = dataSnapshot.val();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, [handle]);

  //  Extract posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (profileData.posts) {
          const postObject = profileData.posts;
          const postPromises = Object.keys(postObject).map(async (postId) => {
            const post = await getPostById(postId);
            return post;
          });

          const userPosts = await Promise.all(postPromises);
          setPosts(userPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, [profileData]);

  const handleChanges = async () => {
    let newData;

    if (user && userData) {
      newData = { ...userData };

      ref.current = document.getElementById("new-email").value;
      if (ref.current) newData.email = ref.current;

      ref.current = document.getElementById("new-password").value;
      newData.password = ref.current;

      ref.current = document.getElementById("new-first-name").value;
      if (ref.current) newData.firstName = ref.current;

      ref.current = document.getElementById("new-last-name").value;
      if (ref.current) newData.lastName = ref.current;
      
      try {
        await updateUserData(userData.handle, newData);
      } catch (error) {
        console.error("Error updating user data:", error.message);
      }
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop();

    await uploadProfilePic(fileExtension, userData.handle, file);
    location.replace("/");
  };

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const handleDeletePost = async (author, id) => {
    try {
      await deletePostById(author, id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <Card className="p-5 my-4" style={{ minWidth: "30dvw" }}>
      {profileData ? (
        <>
          <Row>
            <Col xs={4}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <ProfilePic
                  profilePic={profilePic}
                  widthAndHeight="120px"
                ></ProfilePic>
                {userData && userData.handle === handle && (
                  <Button
                    className="rounded-circle"
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                    }}
                  >
                    <label htmlFor="img-upload" className="custom-file-upload">
                      +
                      <input
                        id="img-upload"
                        type="file"
                        style={{ display: "none" }}
                        onChange={async (e) => {
                          await handleUploadImage(e);
                        }}
                      />
                    </label>
                  </Button>
                )}
              </div>
            </Col>
            {userData && userData.handle === handle && (
              <Col className="d-flex flex-column h-full justify-content-center align-items-center mt-5">
                <h2>Update your profile</h2>
              </Col>
            )}
          </Row>
          <Row className="mt-4">
            <Col xs={4}>
              <span className="ms-3 mt-4 fs-3 text-muted">
                {profileData.handle}
              </span>
            </Col>
            {userData && userData.handle === handle && (
              <>
                <Col xs={4}>
                  <input
                    type="text"
                    id="new-email"
                    className="form-control"
                    placeholder="Email"
                  />
                </Col>
                <Col xs={4}>
                  <input
                    type="password"
                    className="form-control"
                    id="new-password"
                    placeholder="Password"
                  />
                </Col>
              </>
            )}
          </Row>
          <Row className="mt-1">
            <Col xs={4}>
              <span className="ms-3 fs-5">
                {profileData.firstName &&
                  profileData.firstName + " " + profileData.lastName}
              </span>
            </Col>
            {userData && userData.handle === handle && (
              <>
                <Col xs={4}>
                  <input
                    type="text"
                    id="new-first-name"
                    className="form-control"
                    placeholder="First name"
                  />
                </Col>
                <Col xs={4}>
                  <input
                    type="text"
                    className="form-control"
                    id="new-last-name"
                    placeholder="Last name"
                  />
                </Col>
              </>
            )}
          </Row>
          {userData && userData.handle === handle && (
            <Row className="my-5">
              <Col xs={4}></Col>
              <Col
                xs={8}
                className="d-flex flex-row w-full justify-content-center"
              >
                <Button className="mb-4" onClick={handleChanges}>
                  Update profile info
                </Button>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              {posts.length > 0 ? (
                <div className="w-100 d-flex flex-column justify-content-center align-items-center mt-3">
                  <h1 className="fs-1 fw-light mb-5">
                    View {posts[0].length} posts:
                  </h1>
                  {posts.map((post, index) => {
                    if (post.author === handle) {
                      return (
                        <Post
                          key={index}
                          author={post.author}
                          title={post.title}
                          content={post.content}
                          comments={
                            post.comments ? Object.values(post.comments) : []
                          }
                          likes={post.likedBy ? post.likedBy.length : 0}
                          createdOn={post.createdOn}
                          postId={post.id}
                          onUpdate={setPosts}
                          onDelete={() => handleDeletePost(post.author, post.id)}
                          userPriviliges={userData ? userData.priviliges : null}
                          style={{ backgroundColor: "rgba(235, 230, 235, 0.25)" }}
                        />
                      );
                    }
                  })}
                </div>
              ) : (
                <h1>User doesn&apos;t have any posts</h1>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </Card>
  );
}
