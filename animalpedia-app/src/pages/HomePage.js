import React, { useState, useEffect } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PreviewCard from '../components/PreviewCard'
import BlogPost from '../components/BlogPost'
import WeatherWidget from '../components/WeatherWidget'
import NotificationMessage from '../components/NotificationMessage'

import articles from './article-content'
import forest from '../assets/forest.jpg'
import factImage from '../assets/did-you-know.png'

import axiosRequests from '../api/apiCalls'
import { FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';
const HomePage = () => {

    const [fact, setFact] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosRequests.getFact()
                    .then(res => {
                        setFact(res.data)                        
                    });

            } catch (error) {
                console.error(error);
            } finally {
                // setLoading(false);
            }
        }
        fetchData();
        
    }, []);

    return (
        <div>
            <Header />
            <NotificationMessage />
            <div className='container mt-5 mb-2 custom-wide-container'>
                <div className="jumbotron p-3 p-md-5 text-dark rounded-top" style={{ backgroundImage: `url(${forest})`, backgroundSize: 'cover', backgroundPosition: 'center', height: "350px" }}>
                    <div className="col-md-8 px-0" >
                        <h1 className="display-4 font-italic"><em>Unveiling the Wonders of the Animal Kingdom</em></h1>
                    </div>
                </div>

                <div className="row mb-2 mt-2">
                    <PreviewCard animalName={"gator"} />
                    <PreviewCard animalName={"tarsier"} />
                    <PreviewCard animalName={"marine iguana"} />
                </div>


                <main role="main">
                    <div className="row">
                        <hr />
                        <div className="col-md-8 blog-main pt-3">

                            <BlogPost article={articles[0]} />

                            <BlogPost article={articles[2]} />

                            <BlogPost article={articles[1]} />
                            {/* <nav className="blog-pagination">
                                <a className="btn btn-outline-primary">Older</a>
                                <a className="btn btn-outline-secondary disabled" >Newer</a>
                            </nav> */}

                        </div>

                        <aside className="col-md-4 blog-sidebar">
                            <WeatherWidget city={"larisa"} />


                            {/* <div className="m-3">
                                <div className="ratio ratio-16x9">
                                    <iframe
                                        src="https://www.youtube.com/embed/5kozt0uDa4c"
                                        title="YouTube video"
                                        allowFullScreen
                                    />
                                </div>
                            </div> */}

                            <div className='d-flex align-items-center rounded border border-dark p-2 mt-3' style={{ background: "#C1E1C1" }}>
                                <img src={factImage} alt="Random Trivia" />
                                <p className='p-2 m-0'>{fact ? fact : "loading..."}.</p>                            
                            </div>

                            <div className="p-3">
                                <h4 className="font-italic">Archives</h4>
                                <ol className="list-unstyled mb-0">
                                    <li><a >March 2014</a></li>
                                    <li><a >February 2014</a></li>
                                    <li><a >January 2014</a></li>
                                    <li><a >December 2013</a></li>
                                    <li><a >November 2013</a></li>
                                    <li><a >October 2013</a></li>
                                    <li><a >September 2013</a></li>
                                    <li><a >August 2013</a></li>
                                    <li><a >July 2013</a></li>
                                    <li><a >June 2013</a></li>
                                    <li><a >May 2013</a></li>
                                    <li><a >April 2013</a></li>
                                </ol>
                            </div>

                            <div className="p-3">
                                <h4 className="font-italic">Elsewhere</h4>
                                <ul className="list-unstyled">
                                    <li>
                                        <FaGithub style={{ marginRight: '8px' }} />
                                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
                                    </li>
                                    <li>
                                        <FaTwitter style={{ marginRight: '8px' }} />
                                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a>
                                    </li>
                                    <li>
                                        <FaFacebook style={{ marginRight: '8px' }} />
                                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
                                    </li>
                                </ul>
                            </div>
                        </aside>

                    </div>

                </main>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage