import React from 'react'
import { FaGithub } from 'react-icons/fa';

import Header from '../components/Header'
import Footer from '../components/Footer'

const AboutPage = () => {
    return (
        <div>
            <Header />
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <h1 className="mb-4">About Us</h1>
                        <p>
                            Welcome to our website! We are a dedicated team of individuals passionate 
                            about [describe your website's purpose or mission].
                        </p>
                        <p>
                            Our mission is to [describe your mission or goals]. Through [briefly explain 
                            how your website or service achieves its mission].
                        </p>
                        <h2 className="mt-5">Our Team</h2>
                        <div className="row mt-3">
                            <div className="col-md-4">
                                {/* <img
                                    src="path_to_image"
                                    alt="Team Member 1"
                                    className="img-fluid rounded-circle mb-2"
                                /> */}
                                <h3>John Doe</h3>
                                <p>Co-Founder &amp; CEO</p>
                            </div>
                            <div className="col-md-4">
                                {/* <img
                                    src="path_to_image"
                                    alt="Team Member 2"
                                    className="img-fluid rounded-circle mb-2"
                                /> */}
                                <h3>Jane Smith</h3>
                                <p>Co-Founder &amp; CTO</p>
                            </div>
                            {/* Add more team members as needed */}
                        </div>
                        <h2 className="mt-5">Our Story</h2>
                        <p>
                            [Provide a brief history of your organization, including how and why it was founded. 
                            Highlight important milestones and achievements.]
                        </p>
                        <h2 className="mt-5">Contact Us</h2>
                        <p>
                            If you have any questions or inquiries, feel free to reach out to us at [contact email or phone number].
                        </p>
                        <div className="mt-4">
                            <a
                                href="https://github.com/your-username/your-repo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-dark"
                            >
                                <FaGithub size={20} className="mr-2" />
                                View Source Code on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutPage