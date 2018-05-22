import React, { Component } from 'react';
import { Nav, NavItem, Modal, Carousel } from 'react-bootstrap';
import resume from './data/files/Resume.pdf';
import SkillsList from './data/skills.json';
import ProjectList from './data/projects.json';
import WorkList from './data/work.json'
// import logo from './logo.svg';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './data/font-mfizz-2.4.1/font-mfizz.css';



class BoxComponent extends Component {
	renderContent() {
		let props = this.props.content;
		switch(props.displaytype) {
			case "font":
				let cls = props.fatype;
				if (props.fatype === "fz") {
					cls += " icon-" + props.faname;
				} else {
					cls += " fa-" + props.faname + " fa-3x";
				}
				return (
					<div>
						<i className={cls}></i>
						<p className="text-center showOnHover">{props.name}</p>
					</div>
				);
			case "image":
				let src = require("./data/" + props.type + "/" + props.name + "/" + props.name + ".png");
				let style = {width: props.imgsize};
				return (
					<div>
						<img src={src} alt={props.name} style={style}/>
						<p className="text-center showOnHover showOnHoverImg">{props.name}</p>
					</div>
				);
			default: // For a "text" case
				return <p className="text-center show">{props.name}</p>;
		}
	}

	renderBox() {
		let classList = "boxcomponent " + this.props.content.type;
		let url = this.props.content.clickurl;
		if (url) {
			return (
				<a href={url}>
					<div className={classList}>
						{this.renderContent()}
					</div>
				</a>
			);
		} else {
			return (
				<div className={classList}>
					{this.renderContent()}
				</div>	
			);
		}
	}

	render() {
		let wrapperClassList = "col-md-" + this.props.size;
		return (
			<div className={wrapperClassList}>
				{this.renderBox()}
			</div>
		);
	}
}

class About extends Component {
	renderBoxComponent(work, size) {
		return <BoxComponent key={work.name} content={work} size={size}/>;
  	}

  	handleClick(Key) {
  		this.props.onKeyChange(Key);
  	}

	render() {
		let WorkExp = WorkList.map((work) =>
			this.renderBoxComponent(work, 3)
		);
		return (
			<div className="About">
				<p>
					Welcome to my website! I’m Richard.
					I’m a software developer, data scientist and computer science student at the University of Waterloo.
					I got into coding when I started university in 2016. 
					Since then, I’ve gained a lot of programming experiences through school, co-op and personal projects, 
					and now I’ve got many <a onClick={() => this.handleClick(2)}>skills and techniques</a> under my belt.
					In my spare time, I enjoy coding, playing sports, gaming and playing piano.<br/><br/>
					Here, I also put some of the <a onClick={() => this.handleClick(3)}>projects</a> that I’ve worked on in the past.
					If you would like to contact me, check out <a onClick={() => this.handleClick(4)}>this page</a>.<br/><br/>
					I'm currently seeking an internship opportunity for this fall, 2018. 
					My contact information can be found <a onClick={() => this.handleClick(4)}>here</a>. 
					Below is the list of companies that I’ve interned in the past.
					<br/><br/>
				</p>
				<div className="row">
					{WorkExp}
				</div>
			</div>
		);
	}
}

class Skills extends Component {
	renderBoxComponent(Skill, Size) {
		return <BoxComponent key={Skill.name} content={Skill} size={Size}/>;
  	}

  	renderSkillsSubset(lists, key) {
  		return (
  			<div key={key.toString()} className="col-md-6">
        		<div className="row">
        			{lists}
				</div>
        	</div>
		);
  	}

  	renderSkills() {
  		let set = [];
  		let superset = [];
  		for (let i = 0; i < SkillsList.length; i++) {
  			set.push(this.renderBoxComponent(SkillsList[i], 3));
  			if (i % 4 === 3 || i === SkillsList.length - 1) {
  				superset.push(this.renderSkillsSubset(set, i));
  				set = [];
  			}
  		}
  		return superset;
  	}

	render() {
		return (
			<div className="row">
				{this.renderSkills()}
	        </div>
		);
	}
}

class Contact extends Component {
	renderBoxComponent(Type, faType, faName, Name, Size, clickurl) {
		let Contact = {
			displaytype: "font",
			type: Type,
			fatype: faType,
			faname: faName,
			name: Name,
			clickurl: clickurl
		};
    	return <BoxComponent key={Name} content={Contact} size={Size}/>;
  	}

	render() {
		return (
			<div className="row">
				{this.renderBoxComponent("Contact", "far", "file-alt", "Resume", 3, resume)}
				{this.renderBoxComponent("ContactBrand", "fab", "github","Github", 3, "https://github.com/woongbinchoi")}
				<div className="col-md-3">
					<div className="row">
						{this.renderBoxComponent("Contact", "far", "envelope", "Email", 6, "mailto:woongbinchoi@gmail.com")}
						{this.renderBoxComponent("ContactBrand", "fab", "facebook", "Facebook", 6, "https://www.facebook.com/woongbin.choi")}
						{this.renderBoxComponent("ContactBrand", "fab", "instagram", "Instagram", 6, "https://www.instagram.com/woongbinchoi")}
						{this.renderBoxComponent("ContactBrand", "fab", "linkedin", "LinkedIn", 6, "https://www.linkedin.com/in/richard-woongbin-choi-b6000b134/")}
					</div>
				</div>
			</div>
		);
	}
}

class Projects extends Component {
	renderBoxComponent(Project, Size) {
    	return <ClickableBoxComponent key={Project.name} content={Project} size={Size}/>;
  	}

	renderProjects() {
		let projects = ProjectList.map((project) =>
			this.renderBoxComponent(project, 3)
		);
		return projects
	}

	render() {
		return (
			<div className="row">
				{this.renderProjects()}
				{/*
					Icons made by Freepik from www.flaticon.com is licensed by CC 3.0 BY
					Font Awesome Free is free, open source, and GPL friendly. 
					You can use it for commercial projects, open source projects, or really almost whatever you want.
				*/}
			</div>
		);
	}
}

class Main extends Component {
	constructor(props) {
	  	super(props);
	  	this.handleSelect = this.handleSelect.bind(this);
	  	this.state = {
	    	activeKey : 1
	  	};
	}
	handleSelect(selectedKey) {
		this.setState({activeKey: selectedKey});
	}

	renderMain(activeKey) {
		if (activeKey === 1) {
			return <About onKeyChange={this.handleSelect}/>
		} else if (activeKey === 2) {
			return <Skills/>
		} else if (activeKey === 3) {
			return <Projects/>
		} else if (activeKey === 4) {
			return <Contact/>
		}
	}

  	render() {
	    return (
	      	<div className="menudiv">
	      		<Header onKeyChange={this.handleSelect}/>
		        <Nav bsStyle="tabs" justified activeKey={this.state.activeKey} onSelect={key => this.handleSelect(key)}>
		          	<NavItem eventKey={1} title="About">
		           		<p>About</p>
		          	</NavItem>
		          	<NavItem eventKey={2} title="Skills">
		            	<p>Skills</p>
		          	</NavItem>
		          	<NavItem eventKey={3} title="Projects">
		            	<p>Projects</p>
		          	</NavItem>
		          	<NavItem eventKey={4} title="Contact">
		           		<p>Contact</p>
		          	</NavItem>
		        </Nav>
		        {this.renderMain(this.state.activeKey)}
	      	</div>
	    );
	  }
}

class ClickableBoxComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.state = {
   		show: false
    };
  }

  handleShow() {
  	this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

  getDescription() {
  	if (this.props.content.modalinfoDescription) {
  		return this.props.content.modalinfoDescription.join(' ');
  	}
  }

  getModalPicture() {
  	let imgSources = this.props.content.modalPictures;
	let Name = this.props.content.name;

	let CarouselItems = imgSources.map((img) =>
		<Carousel.Item key={img} className="CarouselImage">
	    	<img alt={img} src={require("./data/Projects/"+ Name +"/"+ img)} />
	    </Carousel.Item>
	);

	return (
  		<div className="modalPicture col-md-8">
			<Carousel className="CarouselContainer" interval={10000} slide={false}>
			    {CarouselItems}
			</Carousel>
		</div>
	);
  }

  getLinks() {
  	let ctt = this.props.content;
  	if (ctt.modalinfoGithub && ctt.modalinfoWebsite) {
  		return (
  			<div>
  				<h4><b>Links</b><br/></h4>
  				<a href={ctt.modalinfoWebsite}>Website</a>
  				<br/>
  				<a href={ctt.modalinfoGithub}>Github</a>
 			</div>
		);
  	} else if (ctt.modalinfoGithub) {
  		return (
  			<div>
  				<h4><b>Link</b><br/></h4>
  				<a href={ctt.modalinfoGithub}>Github</a>
 			</div>
		);
  	} else if (ctt.modalinfoWebsite) {
  		return (
  			<div>
  				<h4><b>Link</b><br/></h4>
  				<a href={ctt.modalinfoWebsite}>Website</a>
 			</div>
		);
  	}
  }

  render() {
    return (
      	<div>
        	<div onClick={this.handleShow} className="clickableboxcomponent">
        		<BoxComponent content={this.props.content} size={this.props.size}/>
        	</div>
        	<Modal
	          	show={this.state.show}
	          	onHide={this.handleHide}
	          	dialogClassName="custom-modal">
		        <Modal.Header id="ModalHeader" closeButton>
		            <Modal.Title id="contained-modal-title-lg" className="text-center">
		                <b>{this.props.content.name}</b>
		            </Modal.Title>
	            </Modal.Header>

	          	<Modal.Body id="ModalBody">
	          		<div className="row modalRow">
	          			{this.getModalPicture()}
	          			<div className="modalInfoContainer col-md-4">
	          				<div className="modalInfo">
		          				<p>{this.getDescription()}<br/><br/></p>
			             		<p>{this.getLinks()}<br/></p>
		          				<h4><b>Tools</b><br/></h4>
		          				<p>{this.props.content.modalinfoTools}<br/><br/></p>
		          				<h4><b>Date</b><br/></h4>
		          				<p>{this.props.content.modalinfoDate}</p>
	          				</div>
	          			</div>
	          		</div>
	          	</Modal.Body>
	        </Modal>
      	</div>
    );
  }
}

class Header extends Component {
	handleClick(Key) {
  		this.props.onKeyChange(Key);
  	}

	renderProfileSummary() {
		let ExpCount = 2;
		let SkillCount = SkillsList.length;
		let ProjectCount = ProjectList.length;
		return (
			<div className="col-md-8 ProfileSummary">
				<div className="row">
					<h4 className="col-md-5">richardchoi</h4>
					<div className="col-md-4 followButton">
						<button type="button" className="btn" onClick={() => this.handleClick(4)}>Follow</button>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<a onClick={() => this.handleClick(1)}><p><b>{ExpCount}</b> work experiences</p></a>
						<a onClick={() => this.handleClick(2)}><p><b>{SkillCount}</b> skills</p></a>
						<a onClick={() => this.handleClick(3)}><p><b>{ProjectCount}</b> projects</p></a>
					</div>
					<p className="col-md-12" style={{ fontSize: '1.3em' }}><b>Richard Woongbin Choi</b></p>
					<p className="col-md-12" style={{ marginTop: '0.2em' }}>Software Developer ✦ Data Scientist ✦ Student at University of Waterloo</p>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="HeaderDiv">
				<div className="row Header">
					<div className="col-md-4 ProfilePicture">
						<img alt="ProfilePicture" src={require("./data/files/aboutme.png")}/>
					</div>
					{this.renderProfileSummary()}
				</div>
			</div>
		);
	}
}


class App extends Component {
	render() {
	    return (
		    // <div className="App container">
		    //     <header className="App-header">
		    //     	<img src={logo} className="App-logo" alt="logo" />
		    //       	<h1 className="App-title">Welcome to React</h1>
		    //     </header>
		    //     <p className="App-intro">
		    //      	To get started, edit <code>src/App.js</code> and save to reload.
		    //     </p>
	     	//    </div>
	     	<div className="app">
		   		<div className="container">
					<Main/>
			    </div>
			    <div className="Footer container-fluid">
					<p>Copyright &copy; Richard Woongbin Choi 2018.</p>
				</div>
			</div>
	    );
	}
}

export default App;


// //TODO:
// 1. Make the color of the boxes match with the content. Ex) Facebook for blue, etc.
// 2. Make the Co-Op clickable box