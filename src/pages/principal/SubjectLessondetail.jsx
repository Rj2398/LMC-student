import React from 'react'
import { Link, useNavigate } from 'react-router'
const SubjectLessondetail = () => {
	const navigate=useNavigate()

  return (
    <>
    
		<div className="baseline-ass-wrp">
			<div className="back-btn mb-3">
				<Link  onClick={()=>navigate(-1)}>
					<img src="../images/baseline-assessment/back-icon.svg" alt=''/> Back to the Subject
				</Link>
			</div>
			<div className="less-details">
				<h1>Life Dream, Ruby Level, Lesson 1</h1>
				<h1 style={{color: "#4126A8"}}>Life Dream component of PMSC!</h1>
				<div className="less-details-in">
					<h2>Introduction</h2>
					{/* <!-- <h2>Welcome to the Life Dream component of PMSC!</h2> --> */}
					<p>Life Dream helps you visualize success in the future. It also keeps you inspired to overcome
						obstacles when trying to accomplish what you want. You have a long life ahead of you filled with
						many opportunities to make a positive impact on the community and world.</p>
					<p>Agenda</p>
					<p>&#8226; Must I Grow to reach my fullest Potential?</p>
					<p>&#8226; Do I need Courage to become my best?</p>
					<p>&#8226; What is Motivation?</p>
					<p>Imagining your future success and staying inspired to get what you want in life are strongly
						related to hope. Take a look at this short video to learn what some students hope for.</p>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Video</h2>
					<video width="100%" controls poster="../images/lesson-details/tumb_1.svg">
						<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
						<source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg"/>
						Your browser does not support HTML video.
					</video>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>What was the lesson about?</h2>
					<div className="baseline-ass-q-a b-line">
						<label> <input disabled type="radio" name="answer" value="1"/> Moving from Base to Ideal (3)</label>
						<label> <input disabled type="radio" name="answer" value="2"/> Motivation & Growth Potential (2)</label>
						<label> <input disabled type="radio" name="answer" value="3"/> Growth Potential and using
							Motivation(4)</label>
						<label> <input disabled type="radio" name="answer" value="4"/> Knowing when to quit (0)</label>
						<label> <input disabled type="radio" name="answer" value="5"/> Motivation (1)</label>
					</div>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h2>
					<div className="baseline-ass-q-a">
						<label> <input disabled type="radio" name="answer" value="1"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="2"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="3"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="4"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="5"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="6"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="7"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="8"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
					</div>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Growth Potential</h2>
					<p>Growth is to increase in size or maturity across time. It can be seen when watching a seed
						develop into a tree, or looking at pictures of when you were an infant to now. In general,
						everything that is alive, has a natural tendencey to grow.</p>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Art</h2>
					<img src="../images/lesson-details/img_1.svg" alt=''/>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Potential</h2>
					<p>Potential is the possibility of something happening when a person shows effort. Similar to
						Growth, people have some level of Potential to accomplish goals and tasks. Based upon certain
						conditions such as strength, timing, mood, and reflexes, a person may have a high  Potential of
						hitting a home-run.</p>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Art</h2>
					<img src="../images/lesson-details/img_2.svg" alt=''/>
				</div>
				<hr/>
				<div className="less-details-in">
					<p>So, when Growth and Potential are combined, we get **Growth Potential**. This terms is defined as
						the possibility of a person to mature, or accomplish goals and tasks under certain conditions.
					</p>
					<p>Reaching your fullest Potential is being the _best version of yourself_. This is never easy! You
						must be willing to do things that are outside of your comfort zone. Some people are too
						intimidated by struggles they must face to grow. Other people don’t put forth the effort to
						grow, because they have a history of failing, or not getting what they desire. In order to
						become the _best version of yourself_, you must find Courage.</p>
					<p>Let’s take a look at two concepts that are closely linked to Growth Potential.</p>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Base</h2>
					<p>Base is the starting point, origin, or bottom of something. When this term is applied to people,
						it represents the beginning or what’s normal for them. For example, people might have a Base of
						getting a C on a paper, having few friends, or having minimal playing time in a sport.</p>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Art</h2>
					<img src="../images/lesson-details/img_2.svg" alt=''/>
					<img src="../images/lesson-details/img_2.svg" alt=''/>
					<img src="../images/lesson-details/img_2.svg" alt=''/>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h2>
					<div className="baseline-ass-q-a">
						<label> <input disabled type="radio" name="answer" value="1"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="2"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="3"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="4"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="5"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="6"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="7"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
						<label> <input disabled type="radio" name="answer" value="8"/> Lorem ipsum dolor sit amet, consectetur
							adipiscing elit,</label>
					</div>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Ideal</h2>
					<p>Take a look at this short video about what type of vacation a youngster wants.</p>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Video</h2>
					<video width="100%" controls poster="../images/lesson-details/tumb_2.svg">
						<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
						<source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg"/>
						Your browser does not support HTML video.
					</video>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Ideal</h2>
					<p>Ideal is what a person wants to happen. It shows a person has a desire for change, advancement,
						or something better. If we continue with our example above, this could mean getting an A on a
						paper, have many friends, or playing the majority of time in a sport.</p>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2>Art</h2>
					<img src="../images/lesson-details/img_2.svg" alt=''/>
					<img src="../images/lesson-details/img_2.svg" alt=''/>
					<img src="../images/lesson-details/img_2.svg" alt=''/>
				</div>
				<hr/>
				<div className="less-details-in">
					<h2 className="mb-0">Read the sentence below and fill-in the blank with the correct term.</h2>
				</div>
			</div>
			<div className="bottom-cta justify-content-end">
				<a href="javascript:void(0);" data-bs-target="#quit-popup" data-bs-toggle="modal" className="next-cta">Next
					Lesson <i className="fa-regular fa-arrow-right"></i></a>
			</div>
		</div>

    
    </>
  )
}

export default SubjectLessondetail
