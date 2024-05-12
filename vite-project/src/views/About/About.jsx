import { useEffect, useState } from 'react';
import { getNumberOfPosts, getNumberOfUsers } from '../../services/posts.service';
import { Row, Col } from 'react-bootstrap';

export default function About() {
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  useEffect(() => {
    getNumberOfPosts().then(setNumberOfPosts).catch(console.error);
    getNumberOfUsers().then(setNumberOfUsers).catch(console.error);
  }, []);

return (
  <div className="container py-4 text-black fw-light fs-6">
    <div className='rounded py-5 px-5 border-1 border-muted' style={{backgroundColor: 'rgba(230, 230, 230, 0.5)'}}>
    <Row>
      <Col xs={11}>
        <h1 className="mb-4">Welcome to ReactRealm Forum!</h1>
      </Col>
      <Col xs={1} className='py-1 h-25 d-flex flex-column align-items-center justify-content-center rounded' style={{backgroundColor: 'rgba(230, 230, 230, 0.55)'}}>
        <p className='my-0'><b>Posts:</b> {numberOfPosts}</p>
        <p className='my-0'><b>Users:</b> {numberOfUsers}</p>
      </Col>
    </Row>
    <section className="mb-4">
      <h2>About Us</h2>
      <p>
        At ReactRealm, we believe in fostering vibrant online communities
        where people can connect, engage, and share knowledge. Our platform is
        designed to provide a welcoming space for enthusiasts, learners, and
        experts alike to discuss all things related to React.js and beyond.
        Whether you&apos;re just
        starting your journey into web development or you&apos;re a seasoned
        professional, ReactRealm Forum is here to support you every step of the
        way.
      </p>
    </section>
    
    <section className="mb-4">
      <h2>Core Features</h2>
      <ul>
        <li>
          <strong>Engaging Discussions:</strong> Dive into lively discussions
          on a wide range of topics, from React best practices to cutting-edge
          frontend technologies.
        </li>
        <li>
          <strong>Knowledge Sharing:</strong> Share your expertise, ask
          questions, and learn from fellow community members in an inclusive
          and supportive environment.
        </li>
        <li>
          <strong>Top Posts and Recent Activity:</strong> Stay updated on the
          latest trends and insights with our curated lists of top posts and
          recent activity.
        </li>
        <li>
          <strong>Community-driven:</strong> Our platform is driven by the
          contributions of our vibrant community members. Your voice matters,
          and we&apos;re here to amplify it.
        </li>
      </ul>
{/* 
    <p>Number of posts: {numberOfPosts}</p>
    <p>Number of users: {numberOfUsers}</p> */}
    </section>

    <section className="mb-4">
      <h2>Join the Community</h2>
      <p>
        Ready to join the conversation? Sign up for a free account today and
        become part of our growing community of developers and enthusiasts.
        Whether you&apos;re here to ask questions, share your experiences, or
        connect with like-minded individuals, ReactRealm Forum is the place to
        be.
      </p>
    </section>

    <section className="mb-4">
      <h2>Get in Touch</h2>
      <p>
        Have questions, feedback, or suggestions? We&apos;d love to hear from you!
        Reach out to us via email 
        or connect with us on social media
      </p>
    </section>
    </div>
  </div>
);
}