import "./App.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState(() => sessionStorage.getItem('userName') || '')

    function handleLogout() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userName')
        setUserName('')
    }
    return (
        <div className="home-page">
            <header>
                <div class="topbar">

                </div>
                <nav class="header">
                    <p class="logo">W.</p>
                    <ul id="list1">
                        <li class="l1" id="drrop">Explore
                            <div id="cityNames">
                                <div class="city"><input type="radio" />Awards</div>
                                <div class="city"> <input type="radio" /> By Category</div>
                                <div class="city"> <input type="radio" /> By Technology</div>
                                <div class="city"> <input type="radio" /> Category</div>
                                <div class="city" style={{ borderStyle: "none" }}> <input type="radio" /> Blog</div>
                            </div>
                        </li>
                        <li class="l1">Direcotry</li>
                        <li class="l1">Academy <span id="new">New</span></li>
                        <li class="l1">Jobs</li>
                        <li class="l1">Market</li>
                    </ul>
                    <div class="searchbar">
                        {/* <!-- <i class="fa fa-search"></i> --> */}
                        <input type="search" placeholder="Search by Inspiration" id="search" />
                    </div>
                    {userName ? (
                        <div className="login_singup signed-in-user">
                            <span className="user-initial" aria-label={`${userName}'s account`} title={userName}>
                                {userName.trim().charAt(0).toUpperCase()}
                            </span>
                            <button className="logout-button" type="button" onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className="login_singup">
                            <p className="login" id="login" onClick={() => navigate("/login")}>Login</p>
                            <p className="login" id="signUp" onClick={() => navigate("/signup")}>Sign Up</p>
                        </div>
                    )}
                    <div class="button_last">
                        <button id="first_button">Be Pro</button>
                        <button id="second_button">Submit Website</button>
                    </div>
                </nav>
            </header>
            <div id="right_corner_icons">
                <p class="pin"><i className="fa fa-save"></i></p>
                <p class="pin"><i className="fa fa-share-alt"></i></p>
                <p class="pin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="30" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M13 5h6v6" />
                        <path d="M19 5 10 14" />
                        <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
                    </svg>

                </p>
            </div>
            <div class="inner_text">
                <p id="text">Nominee - Oct 16, 2026</p>
                <h1 id="big_text">3D DISCOVERY</h1>
                <div class="img_text">
                    <img src="/images.jpg" alt="No Image" id="profile_img" />
                    <strong>Thibault Guignand
                        <p id="border"></p>
                    </strong>
                </div>
            </div>
            <div id="hero_section">
                <img src="/hero.jpeg" alt="no img" id="hero_img" />
            </div >
            <p id="under_hero_text">Turn your spaces into immersive experiences.</p >
            <div id="side_text">
                <p class="sideText1">Elements</p>
                <p class="sideText2">See the highlights of this website.</p>

            </div>
            <div id="boxes">
                <div id="row1">
                    <div class="mini_box"><img src="/1.jpeg" alt="No Image" class="boxImg" /></div>
                    <div class="mini_box"><img src="/2.jpeg" alt="No Image" class="boxImg" /></div>
                    <div class="mini_box"><img src="/3.jpeg" alt="No Image" class="boxImg" /></div>
                </div>
                <div id="row2">
                    <div class="mini_box"><img src="/4.jpeg" alt="No Image" class="boxImg" /></div>
                    <div class="mini_box"><img src="/5.jpeg" alt="No Iamge" class="boxImg" /></div>
                    <div class="mini_box"><img src="/6.jpeg" alt="No Iamge" class="boxImg" /></div>
                </div>
                <div id="row3">
                    <div class="mini_box"><img src="/7.jpeg" alt="No Image" class="boxImg" /></div>
                    <div class="mini_box"><img src="/8.jpeg" alt="No Image" class="boxImg" /></div>
                </div>
            </div>
            <div id="underImg">
                <p class="text_inside">This website was built with...</p>
                {/* <!-- <p class="text_inside">This website was built with...</p> --> */}
                <div id="boxIn">
                    <div class="innerBox1"></div>
                    <div class="innerBox2"></div>
                    <button class="inner_btn">Hotel/Restaurant</button>
                    <button class="inner_btn">Promotional</button>
                    <button class="inner_btn">Real Estate</button>
                    <button class="inner_btn">Transitions</button>
                    <button class="inner_btn">3D</button>
                    <button class="inner_btn">UI Design</button>
                </div>
                <div>
                    <button class="inner_btn">Microinteractions</button>
                    <button class="inner_btn">GSAP</button>
                    <button class="inner_btn">Next.Js</button>
                    <button class="inner_btn">Sanity</button>

                </div>

            </div>
            <div class="lastDiv">
                <div id="footUPHeading">
                    <div id="headings">
                        <p id="heading1">Votes</p>
                        <p id="heading2">Community Members</p>
                    </div>
                    <ul id="list">
                        <li class="l2">Design</li>
                        <li class="l2">Usability</li>
                        <li class="l2">Creativity</li>
                        <li class="l2">Content</li>
                        <li class="l2">Overall</li>
                    </ul>


                </div>

                <div class="headings2">
                    <div class="indiv">
                        <div class="imgText">
                            <img src="https://www.shutterstock.com/image-photo/portrait-relax-selfie-woman-home-260nw-2755910041.jpg"
                                alt="" class="inImg" />
                            <div class="imgText1">
                                <p class="imgText2">raybump</p>
                                <span class="between">from</span>
                                <p class="imgText2">United States</p>
                            </div>
                            <table class="table1">
                                <tr>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>9</td>
                                    <td>9.90</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="headings2">
                    <div class="indiv">
                        <div class="imgText">
                            <img src="https://www.shutterstock.com/image-photo/portrait-headshot-confident-positive-woman-260nw-2734807251.jpg"
                                alt="" class="inImg" />
                            <div class="imgText1">
                                <p class="imgText2">andreebel</p>
                                <span class="between">from</span>
                                <p class="imgText2">Germany</p>
                            </div>
                            <table class="table2">
                                <tr>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>9</td>
                                    <td>9.90</td>
                                </tr>
                            </table>

                        </div>
                    </div>
                </div>
                <div class="headings2">
                    <div class="indiv">
                        <div class="imgText">
                            <img src="https://www.shutterstock.com/image-photo/closeup-portrait-brazilian-woman-relaxing-260nw-2761257083.jpg"
                                alt="" class="inImg" />
                            <div class="imgText1">
                                <p class="imgText2">ErreD </p>
                                <span class="between">from</span>
                                <p class="imgText2">Italy</p>
                            </div>
                            <table class="table3">
                                <tr>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>9</td>
                                    <td>9.90</td>
                                </tr>
                            </table>

                        </div>
                    </div>
                </div>
                <div class="headings2">
                    <div class="indiv">
                        <div class="imgText">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1OPCIyuxd9ykmAlLaN-4DLMO0JHkEadnMRonTnP1jNFTbzHHk2_zAGQY&s=10"
                                alt="" class="inImg" />
                            <div class="imgText1">
                                <p class="imgText2">abdulaziz-kenjayev</p>

                            </div>
                            <table class="table4">
                                <tr>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>9</td>
                                    <td>9.90</td>
                                </tr>
                            </table>

                        </div>
                    </div>
                </div>
                {/* <!-- <button class="lastbtn">...</button> --> */}
            </div>
            <p id="foottext">W.</p>
            <div id="footerList">
                <ul class="footlist">
                    <li class="lfoot">Websites</li>
                    <li class="lfoot">Collections</li>
                    <li class="lfoot">Elements</li>
                </ul>
                <ul class="footlist">
                    <li class="lfoot">Academy</li>
                    <li class="lfoot">Jobs</li>
                    <li class="lfoot">Market</li>
                </ul>
                <ul class="footlist">
                    <li class="lfoot">Direcotry</li>
                    <li class="lfoot">Confreneces</li>

                </ul>
                <ul class="footlist">
                    <li class="lfoot">FAQs</li>
                    <li class="lfoot">About Us</li>
                    <li class="lfoot">Contact Us</li>
                </ul>

            </div>
            {/* <!-- last border --> */}
            <hr id="footp" />
            <footer>
                <div id="footerText">
                    <p class="footP">Cookies Policy</p>
                    <p class="footP">Legal Terms</p>
                    <p class="footP">Privacy Policy</p>
                </div>
                <div id="footL">
                    <ul id="lastlist">
                        <li class="lastL">Connect:</li>
                        <li class="lastL">Instagram</li>
                        <li class="lastL">LinkedIn</li>
                        <li class="lastL">Twitter</li>
                        <li class="lastL">Facebook</li>
                        <li class="lastL">YouTube</li>
                        <li class="lastL">TikTok</li>
                        <li class="lastL">Pinterest</li>
                    </ul>

                </div>
            </footer>
        </div>
    )
}

export default Home
