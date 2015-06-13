RIOT-JS sandboxing
=================

This project has little to no use other than for me to play with and learn [riotjs][riotjs], [gulp][gulp], and building a web application from scratch.

**Why RiotJS?**

I love simplicity. I really wanted to learn [reactjs][reactjs] recently, but as I was doing my research I stumbled on [riot][riotjs] and I was pretty blown away. Something about it resonates with my morals about programming.

**Notable Milestones:**
* Riotjs compilation
* Gulp build to dist
    * minify, uglify, and concat javascript
    * Handles bower dependencies using wiredep
    * Injects source files into index
    * compress images

**Needs:**
* Get the watch command to properly handle rebuilds and automatic reloading of the source

**What I've learned**

I love RiotJs. The framework (if you can really call it that) is extremely lightweight, elegant and pure. The code is nice and concise by way of letting you include your view and controller into the same file. It's really flexible, allowing you to plug and play various javascript pre-processors. Eventually, when I get time to learn Livescript, I will be able to comeback and quickly alter the compiler to accommodate. Awesome.

Gulp is super cool and is slowly becoming my choice of build tool for web applications over [grunt][grunt]. I really enjoy the piping strategy over configuration style. Being able to break it down into parts seems much easier for me to reason about coming from a functional background. Plus gulp is super fast. Granted this sandbox is nowhere near the size of the applications I've built with grunt, however I can imagine that if I were to convert one of those large scale applications to use grunt, that the ability to parallelize would really come in handy and shave seconds off the build.

The source to distribution mentality and what goes into converting your code to become production ready. Minimizing, uglifying, concatenating, compressing. All things I am starting to get a strong mental model for.

[grunt]:  http://gruntjs.com "Grunt build tool"

[gulp]:   http://gulpjs.com "Gulp build tool"

[riotjs]: https://muut.com/riotjs/ "A react like UI library"

[reactjs]: https://facebook.github.io/react/ "JavaScript library for building user interfaces"

