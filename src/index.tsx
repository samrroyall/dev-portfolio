import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

import BaseHtml from "../components/BaseHtml";
import { Link, Strong } from "../components/shared";

const header = (
  <nav class="absolute left-0 bottom-0">
    <h1>Header Text...</h1>
  </nav>
);

const icons = (
   <ul class="flex symbols-font text-2xl">
      <li class="mr-1">
        <a>\udb80\ude19</a>
      </li>
      <li class="mx-1">
        <a href="#">\udb80\uddee</a>
      </li>
      <li class="mx-1">
        <a href="https://linkedin.com/in/samrroyall">\udb80\udf3b</a>
      </li>
      <li class="ml-1">
        <a href="https://github.com/samrroyall">\uf113</a>
      </li>
    </ul>
);

const footer = (
  <nav class="w-full border-t p-2 flex justify-between">
    <div>Footer Text...</div>
    {icons}
  </nav>
);

const bio = (
  <>
    <p class="mb-3">
      I'm a software engineering generalist with a passion for problem-solving and a love of learning new programming languages and technologies.
    </p>
    <p class="my-3">
      I graduated from the <Strong>University of Chicago</Strong> in 2019 with a B.S. in Computer Science and a B.A in Philosophy.
    </p>
    <p class="my-3">
      I worked previously as a cyber security consultant at <Strong>Stroz Friedberg</Strong> in the Digital Forensics and Incident Response (DFIR) business unit.
    </p>
    <p class="mt-3">
      I am currently a software engineer at <Strong>Manifold</Strong>, where I have worked on a variety of projects all over the stack: including front end work in Angular, API development in Scala, Python work related to LLMs, data modelling graph databases, and cloud infrastructure in AWS. 
    </p>
  </>
);

const projects = (
  <ul>
    <li class="mb-3">
      <Link href="#" arrow={true}>
        <Strong>Klotski Solver</Strong>
      </Link>
      <div class="font-light italic">Description of the project...</div>
    </li>
    <li class="my-3">
      <Link href="#" arrow={true}>
        <Strong>Portfolio</Strong>
      </Link>
      <div class="font-light italic">Description of the project...</div>
    </li>
    <li class="mt-3">
      <Link href="#" arrow={true}>
        <Strong>Tvrtl</Strong>
      </Link>
      <div class="font-light italic">Description of the project...</div>
    </li>
  </ul>
)

const app = new Elysia()
  .use(staticPlugin())
	.use(html())
	.get("/", () => {
		return (
			<BaseHtml>
        <main class="relative">
          {header}
					<div class="mx-auto h-screen w-1/3 border-x flex flex-col justify-between">
            <div class="align-self-top scrollbar scrollbar-thumb-stone-400 scrollbar-track-neutral-900 overflow-y-auto ">
              <div class="mb-10 p-2 flex justify-between">
                <div class="w-1/3">
                  <Strong>Sam Royall</Strong>
                  <div class="font-light">Software Engineer</div>
                </div>
                <div class="w-2/3">
                  {bio}
                </div>
              </div>
              <hr />
              <div class="mb-10 p-2 flex justify-between">
                <div class="w-1/3">
                  <Strong>Projects</Strong>
                  <div class="font-light">...</div>
                </div>
                <div class="w-2/3">
                  {projects}
                </div>
              </div>
              <hr />
              <div class="mb-10 p-2 flex justify-between">
                <div class="w-1/3">
                  <Strong>Sam Royall</Strong>
                  <div class="font-light">Software Engineer</div>
                </div>
                <div class="w-2/3">
                  {bio}
                </div>
              </div>
              <hr />
              <div class="mb-10 p-2 flex justify-between">
                <div class="w-1/3">
                  <Strong>Projects</Strong>
                  <div class="font-light">...</div>
                </div>
                <div class="w-2/3">
                  {projects}
                </div>
              </div>
              <hr />
              <div class="mb-10 p-2 flex justify-between">
                <div class="w-1/3">
                  <Strong>Sam Royall</Strong>
                  <div class="font-light">Software Engineer</div>
                </div>
                <div class="w-2/3">
                  {bio}
                </div>
              </div>
              <hr />
              <div class="mb-10 p-2 flex justify-between">
                <div class="w-1/3">
                  <Strong>Projects</Strong>
                  <div class="font-light">...</div>
                </div>
                <div class="w-2/3">
                  {projects}
                </div>
              </div>
            </div>          
            {footer}
					</div>
				</main>
			</BaseHtml>
		);
	})
	.listen(3000);

console.log(
	`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
