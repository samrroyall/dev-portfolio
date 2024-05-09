import { type HomeSection } from "../../models/home";
import { mockFunc } from "../../utils";

const entries: HomeSection[] = [
  {
    title: "About Me",
    entries: [
      {
        title: "Sam Royall",
        subtitles: [],
        text: `I am a software engineer with a passion for problem-solving 
and a love of learning new programming languages and technologies.

I graduated from the University of Chicago in 2019 with a B.S. in Computer 
Science and a B.A in Philosophy.

I worked previously as a cyber security consultant, focusing on digital 
forensics and incident response. In my current role as a software 
engineer, I have worked on a variety of projects all over the stack.

I am always eager to explore new projects. If you have an exciting opportunity, 
or if you would like to discuss a potential collaboration, please don't 
hesitate to [reach out](#).`,
      },
    ],
  },
  {
    title: "Work Experience",
    entries: [
      {
        title: "Manifold",
        subtitles: [
          {
            title: "Software Engineer",
            detail: "Jul 2021 - Present",
          },
        ],
        text: `I have worked as a software engineer at Manifold since July, 
2021. Since my hiring, I have worked on a variety of internal and client 
projects. 

I have written both backend and frontend code, managed data in both relational 
and graph databases, and worked in cloud environments. 

My backend work has been primarily in Scala and Python, while my frontend work
has been in Angular and React with Typescript. I have also handled cloud 
intrstructure in AWS.`,
      },
      {
        title: "Stroz Friedberg",
        subtitles: [
          { title: "Consultant, DFIR", detail: "Jun 2020 &#8212; Dec 2020" },
          { title: "Cyber Associate", detail: "Jul 2019 &#8212; Jun 2020" },
          {
            title: "Cyber Summer Associate",
            detail: "Jun 2018 &#8212; Aug 2018",
          },
        ],
        text: `I started at Stroz Friedberg as an intern in the summer of 2018. 
I returned as an associate after graduation in 2019, a 9-month rotational 
program covering security advisory consulting, pentesting, and digital 
forensics and incident response (DFIR). 

After this program, I was promoted to consultant in the DFIR business unit. 
Throughout these three roles, I worked on a variety of client engagements, 
including data breaches, ransomware attacks, and insider threats. I also 
created various internal tools, primarily written in Python.`,
      },
      {
        title: "",
        subtitles: [],
        text: `For more information about my work experience, please refer to 
[my resume](#).`,
      },
    ],
  },
  {
    title: "Education",
    entries: [
      {
        title: "University of Chicago",
        subtitles: [
          {
            title: "B.S. Computer Science, B.A. Philosophy",
            detail: "Oct 2015 &#8212; Jun 2019",
          },
        ],
        date: "2019",
        text: `Attended the University of Chicago from 2015 to 2019, graduating 
with a double major in Computer Science and Philosophy and receiving 
_Dean's List_ all four years`,
      },
      {
        title: "Coding Dojo",
        subtitles: [
          {
            title: "Software Development Bootcamp",
            detail: "Jan 2021 &#8212; Apr 2021",
          },
        ],
        date: "2021",
        text: `Participated in a 14-week full stack web development bootcamp 
in 2021,receiving highest honors`,
      },
    ],
  },
  {
    title: "Projects",
    entries: [
      {
        title: "Klotski Solver",
        titleLink: "#",
        subtitles: [],
        text: `This project allows users to create and solve 
[Klotski puzzles](https://en.wikipedia.org/wiki/Klotski). Additionally, the 
app provides optimal solutions to puzzles and can generate random puzzles. For 
more information on how the solver works, see my [blog post](#) on the subject.

The frontend is built with Typescript using React and Redux. Styling is done 
using Material UI. View the frontend source code 
[here](https://github.com/samrroyall/klotski). The backend is build with Rust 
using Axum and Postgres via Diesel. (**TODO**: Talk about deployment.) View the 
backend source code [here](https://github.com/samrroyall/klotski-api). 

This project is inspired by a CLI tool I built in C++. View the source code 
[here](https://github.com/samrroyall/klotski-cpp).`,
      },
      {
        title: "Portfolio",
        subtitles: [],
        text: `This project is my portfolio, which you are currently viewing. 
It is built with Typescript using Bun, ElysiaJS, Turso, and HTMX. Templating is 
done with TSX, and styling is done with Tailwind CSS. (**TODO**: Talk about 
deployment and any APIs or Lambda functions.) View the source code 
[here](https://github.com/samrroyall/dev-portfolio).`,
      },
      {
        title: "Tvrtl",
        subtitles: [],
        text: `This project is built to simulate 
[Brownian motion](https://en.wikipedia.org/wiki/Brownian_motion). The user 
wagers some amount and is placed onto a polygonal arena with some random number 
of other users, each wagering the same amount. A turtle is placed at the center 
of the arena and starts moving on a path generated by Brownian motion. The user
closest to the point where the turtle exits the arena loses their wager. It is
split evenly among the remaining users.

The project is build with Typescript using ReactNative and Recoil. Styling is 
done using NativeBase. View the source code and a video demo of the app 
[here](https://github.com/samrroyall/tvrtl).`,
      },
      {
        title: "ElmCalc",
        titleLink:
          "https://www.classes.cs.uchicago.edu/archive/2019/spring/22300-1/showcase/samrroyall/index.html",
        subtitles: [],
        text: `This project is a simple calculator web app built as a school 
project using Elm. The calculator is styled to look like a TI-84 graphing 
calculator. View the source code 
[here](https://github.com/samrroyall/elmcalc).`,
      },
    ],
  },
];

export const getMockHomeData = (): Promise<HomeSection[]> => mockFunc(entries);
