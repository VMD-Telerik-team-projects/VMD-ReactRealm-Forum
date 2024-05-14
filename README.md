# VMD-ReactRealm-Forum

## ReactRealm Forum

ReactRealm, a community-driven platform where React developers can share knowledge, ask questions, and collaborate on projects. This application is built using React & Bootstrap and offers the opportunity for users to engage in discussions about React and related topics.

## Features:

- User Authentication: Sign up and sing in securely to participate in discussions.
- Post Creation: Create new posts with code highlighting.
- Commenting System: Engage in discussions by commenting on posts or replying to comments.
- Like and Unlike: Like posts and comments.
- Search Functionality: Quickly find posts and topics using the search feature.
- My profile: Uploading profile information and profile pictures.
- Online users: See how many users are online right at this moment.
- Responsive Design: Great for using across devices with the responsive design of Bootstrap.

## Public Part:

The public part is accessible without authentication. On the home page, anonymous users can see how many people are using the platform, how many posts have been created so far and how many people are online. Anonymous users can sign up & sign in. Anonymous users can see a list of the top 10 most liked posts, the comments and replies.

## Private Part:

Accessible only if the user is authenticated. Users can create posts and use highlighting syntax for their code. Users can browse through posts. Users can sort posts by newest, most liked, oldest and by alphabetical order. Users can log in and log out, like, comment and reply to posts. Users can delete their own posts, delete their comments and unlike comments or posts they have previously liked. Users can edit their own posts or comments. Users can update their own profile and upload a profile picture. Users can see all the posts they have created. Users can delete their profile. The Admin can block or unblock users and remove posts or comments from anyone. The Admin can see a list of all users and search for specific users by their email or username.

## Getting Started

### Prerequisites

Using bootstrap, coreui-icons, bootstrap-icons, highlight.js, react-syntax-highlighter, react-toastify

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/react-forum.git
cd VMD-ReactRealm-Forum
Install dependencies:

npm install

Start the development server:

npm run dev

The project structure is as follows:

{
  "[postId]": {
    "author": "string",
    "comments": {
      "[timeStamp]": {
        "[commentTimeStamp]": {
          "[userHandle]": "string",
          "likes": {
            "[userHandle]": "boolean"
          },
          "replies": {
            "[userHandle]": {
              "[timeStamp]": "string",
              "[replyTimeStamp]": "string"
            }
          }
        }
      },
      "content": "string",
      "createdOn": "string",
      "createdOn": "number",
      "likedBy": {
        "[userHandle]": "boolean"
      }
    }
  }
}
