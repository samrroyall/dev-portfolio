import { Link, Markdown, Strong } from "../../shared";
import BasePage from "../BasePage";

const bio = `
I'm a generalist with a passion for problem-solving and a love of learning new 
programming languages and technologies.

I graduated from the University of Chicago in 2019 with a B.S. in Computer 
Science and a B.A in Philosophy.

I worked previously as a cyber security consultant, focusing on digital 
forensics and incident renormalsponse. In my current role as a software 
engineer, I have worked on a variety of projects all over the stack.

I am always eager to explore new projects. If you have an exciting opportunity, 
or if you would like to discuss a potential collaboration, please don't 
hesitate to [reach out](#).
`;

const experience = (
  <ul>
    <li class="mb-3">
      <Strong>Manifold</Strong>
      <div class="w-full flex justify-between font-light">
        <div class="font-light text-white">Software Engineer</div>
        <div class="italic">2021 - Present</div>
      </div>
      <p class="my-3">This is some text</p>
    </li>
    <li class="mt-3">
      <Strong>Stroz Friedberg</Strong>
      <div class="w-full flex justify-between font-light">
        <div class="font-light text-white">Consultant</div>
        <div class="italic">2019 - 2020</div>
      </div>
      <p class="mt-3">This is some text</p>
    </li>
  </ul>
)


const projects = (
  <ul>
    <li class="mb-3">
      <Link href="#" arrow={true}>
        <Strong>Klotski Solver</Strong>
      </Link>
      <p class="my-3">This is some text</p>
    </li>
    <li class="my-3">
      <Link href="#" arrow={true}>
        <Strong>Portfolio</Strong>
      </Link>
      <p class="my-3">This is some text</p>
    </li>
    <li class="mt-3">
      <Link href="#" arrow={true}>
        <Strong>Tvrtl</Strong>
      </Link>
      <p class="mt-3">This is some text</p>
    </li>
  </ul>
)

const education = (
  <ul>
    <li class="mb-3">
      <Strong>University of Chicago</Strong>
      <div class="w-full flex justify-between font-light">
        <div class="text-white">B.S. Computer Science</div>
        <div class="italic">2019</div>
      </div>
      <div class="text-white">B.A. Philosophy</div>
      <p class="mt-3">
        Graduated with a double major in Computer Science and Philosophy, receiving Dean's List all four years
      </p>
    </li>
    <li class="mt-3">
      <Strong>Coding Dojo</Strong>
      <div class="w-full flex justify-between font-light">
        <div class="text-white">Software Development Bootcamp</div>
        <div class="italic">2021</div>
      </div>
      <p class="mt-3">
        Participated in a 14-week full stack web development bootcamp, receiving highest honors
      </p>
    </li>
  </ul>
)

const Home = () => (
  <BasePage>

    <div class="mt-3 mb-10 p-2 flex justify-between">
      <div class="w-1/3">
        <Strong>Sam Royall</Strong>
        <div class="font-light text-white">Software Engineer</div>
      </div>
      <div class="w-2/3">{bio}</div>
    </div>

    <hr class="border-zinc-900" />

    <div class="mt-3 mb-10 p-2 flex justify-between">
      <div class="w-1/3">
        <Strong>Work Experience</Strong>
      </div>
      <div class="w-2/3">
        {experience}
      </div>
    </div>

    <hr class="border-zinc-900" />

    <div class="mt-3 mb-10 p-2 flex justify-between">
      <div class="w-1/3">
        <Strong>Education</Strong>
      </div>
      <div class="w-2/3">
        {education}
      </div>
    </div>

    <hr class="border-zinc-900" />

    <div class="mt-3 mb-10 p-2 flex justify-between">
      <div class="w-1/3">
        <Strong>Projects</Strong>
      </div>
      <div class="w-2/3">
        {projects}
      </div>
    </div>

  </BasePage>
);

export default Home;
