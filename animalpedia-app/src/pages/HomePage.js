import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PreviewCard from '../components/PreviewCard'
import BlogPost from '../components/BlogPost'
import WeatherWidget from '../components/WeatherWidget'

import articles from './article-content'
import forest from '../assets/forest.jpg'

import { FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div>
            <Header />
            <div className='container mt-5 mb-2'>
                <div className="jumbotron p-3 p-md-5 text-dark rounded" style={{ backgroundImage: `url(${forest})`, backgroundSize: 'cover', backgroundPosition: 'center', height: "350px" }}>
                    <div className="col-md-8 px-0" >
                        <h1 className="display-4 font-italic"><em>Unveiling the Wonders of the Animal Kingdom</em></h1>
                    </div>
                </div>

                <div className="row mb-2 mt-2">
                    <PreviewCard animalName={"Cheetah"} />
                    <PreviewCard animalName={"dolphin"} />
                </div>

                <main role="main" className="container">
                    <div className="row">
                        <hr />
                        <div className="col-md-8 blog-main pt-3">

                            <BlogPost article={articles[0]} />

                            <BlogPost article={articles[1]} />

                            <nav className="blog-pagination">
                                <a className="btn btn-outline-primary">Older</a>
                                <a className="btn btn-outline-secondary disabled" >Newer</a>
                            </nav>

                        </div>

                        <aside className="col-md-4 blog-sidebar">
                            <WeatherWidget city={"larisa"} />

                            {/* <div className="p-3">
                                <h4 className="font-italic">Archives</h4>
                                <ol className="list-unstyled mb-0">
                                    <li><a href="#">March 2014</a></li>
                                    <li><a href="#">February 2014</a></li>
                                    <li><a href="#">January 2014</a></li>
                                    <li><a href="#">December 2013</a></li>
                                    <li><a href="#">November 2013</a></li>
                                    <li><a href="#">October 2013</a></li>
                                    <li><a href="#">September 2013</a></li>
                                    <li><a href="#">August 2013</a></li>
                                    <li><a href="#">July 2013</a></li>
                                    <li><a href="#">June 2013</a></li>
                                    <li><a href="#">May 2013</a></li>
                                    <li><a href="#">April 2013</a></li>
                                </ol>
                            </div>*/}

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