import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import image2 from '../../images/Logo.png';
import video from '../../images/bgvideo.mp4';
// Define the Home component
class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <div className="home-banner">
                    <div className="home-content">
                        <div className="home-text">
                            <div className="home-header">
                                <h1>Welcome to Our Department Learning Portal</h1>
                                <p>Explore, Learn, and Excel in Your Studies</p>
                            </div>
                            <p>
                                Ready to <Link to="/login" className="btn-primary">get started?</Link>
                            </p>
                        </div>
                        <div className="home-image">
                            <img src={image2} alt="Home Image" />
                        </div>
                        <div className="home-video">
                            <video autoPlay loop muted>
                                <source src={video} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>

                <div className="home-features">
                    <div className="feature">
                        <h2>Access Lectures</h2>
                        <p>Gain access to a vast library of lectures and educational resources uploaded by teachers.</p>
                    </div>
                    <div className="feature">
                        <h2>Download Materials</h2>
                        <p>Download lecture notes, presentations, and study materials to aid your learning process.</p>
                    </div>
                    <div className="feature">
                        <h2>Interactive Learning</h2>
                        <p>Engage in interactive learning experiences through quizzes, assignments, and discussions.</p>
                    </div>
                </div>

                <div className="about">
                    <div className="about-text">
                        <h2>ABOUT US</h2>
                        <p>Our Department learning Portal is a platform designed to help students access educational resources and engage in interactive learning experiences. The platform provides students with access to a vast library of lectures, study materials, and interactive learning tools to aid their learning process. Students can download lecture notes, presentations, and other study materials uploaded by teachers, as well as engage in quizzes, assignments, and discussions to test their knowledge and understanding of the subject matter. Our Department learning Portal aims to provide students with a comprehensive learning experience that will help them excel in their studies and achieve their academic goals.</p>
                    </div>
                    <div className="right-side-image">
                        <img src={image2} alt="Right Side Image" />
                    </div>
                </div>

                <div className='contact'>
                    <h2>CONTACT US</h2>
                    <p>If you have any questions or need assistance, please feel free to contact us.</p>
                    <p>Email:</p>
                    <div className="social-media-links">
                        <a href="https://example.com/facebook" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://example.com/twitter" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://example.com/instagram" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                <div className="home-footer">
                    <p>&copy; 2021 Our Department Learning Portal. All Rights Reserved.</p>
                </div>
            </div>
        );
    }
}

// Export the Home component
export default Home;
