ONOFF
=====

A game created for [js13kGames 2018](https://js13kgames.com/entries/onoff)

Navigate through 25 brain-teasing levels in this fast-paced, hand-crafted platformer. You'll dodge spikes, jump over pits, and toggle between dimensions.

- Create and share your own levels
- Gamepad support (your mileage may vary)!
- Custom game engine and physics
- Custom design and music/sfx

---

Post Mortem
===========

In one of my weekly developer emails I'm subscribed to, I saw a link for JS13KGames. I've always wanted to create a video game, so I was instantly intrigued. After checking out the details, I really wanted to do it. In fact, I already had a concept that I came up with a couple of years ago. I know enough JavaScript to get by, but I don't know it inside/out. I really wanted to participate, but I knew if I wanted to really make the game I envisioned I'd need some help. So I asked my buddy, [Brad](https://github.com/braddunbar), who is a whiz at JavaScript. He said "Yes!" without any hesitation when I asked him about it! We had actually made a [game](https://game.getharvest.com/) before together (in three days!), so we already had some experience under our belt.

### Concept

As I mentioned, A couple of years ago I came up with the basic concept/mechanic of toggling layers on and off to create various platforming challenges. I had even sketched out several level designs, and cobbled together a super basic prototype using [Phaser.io](http://phaser.io/). It felt good then, so I really didn't need to put in a lot of extra to refine the mechanic. Right at the start, I knew that our character movement would consist of moving left/right and jumping. I also knew that there would be spikes that would instakill our character.

There are [other ideas](https://github.com/starzonmyarmz/js13k-2018/projects/1) that we had early on such as moving platforms/spikes, enemies, variances in gravity, and an in game timer, but we ended up punting on - mostly due to time and size constraints. That said, I'm really glad we punted on those mechanics. Aside from adding complexity to our code, I think having the constraints that we did made us explore more in level design - as well as simplifying game play.

### Art Style, Design, and UX

I had originally envisioned the game having a pixel art style, but with the 13K and 30 day limits, I decided to make this as easy as possible. I knew that designing a minimum of 20 levels would take up quite a bit of time, and exploring pixel sprites and background designs would have prevented me from being able to create enough levels to make the game worth playing. Before I created any mockups I decided to stick to two colors (I suppose three if you count the 'off' layer).

I didn't want to have to use text to explain how to play the game. So as far as _educating_ the player, I took inspiration from countless video games (but specifically Super Mario World, Super Metroid, Megaman X), and started out by creating the first three levels that would introduce the game mechanics. I then kept exploring various level designs until I had about six or seven solid levels.

![original idea about education](https://i.imgur.com/cndNSyh.png)

_Original idea for educating game controls to player_

While Brad started developing the mechanics, I solicited the help of my son, to help me design the character. What we ended up going with in the final game is pretty darn close to what we first designed. It went through some variations, but in the end we kept coming back to our robot-looking character. In my mind I could see his legs moving and his head bobbing. He originally had rounded corners, but that ended up making the `svg` output more complicated, so in the end we ditched them.

![character ideas](https://i.imgur.com/7dEDwT2.png)

_Other character ideas_

I liked the idea of the _toggle_ concept being carried through all the various screens, and not just the levels. So I designed the title, end, and controller screens with this in mind.

![typeface](https://i.imgur.com/S2H19VS.png)

_[Custom typeface](https://github.com/starzonmyarmz/js13k-2018/blob/gh-pages/refs/onoff.otf) designed for ONOFF_

### Music and Sound Effects

I procrastinated with sound for two weeks or so. At first I got hung up on the options available for creating music and sound effects, until I came across [TinyMusic](https://github.com/kevincennis/TinyMusic). I really liked the simplicity of it, that I was able to focus on music, and not get hung up on the plethora of styles and effects.

The [original track](http://jsfiddle.net/0k6tLnfd/8/) I wrote was more driving, but lacked personality. I hemmed and hawed for a week, then one morning I just started humming a really silly tune, and it felt just right for the game. The second part of that song (with the walking bass line) came a week later. I was experimenting to see if I could get chords [fade in and out](https://github.com/starzonmyarmz/js13k-2018/blob/gh-pages/src/sound.js#L327-L351). Once I got that working the bass line just worked itself out, and I had the second half to my song.

For sound effects, I had found some effects, I really liked on [OpenGameArt](https://opengameart.org/) - however the file sizes were huge. No amount of resampling I tried got them even close to 13K. So I ended up trying to _recreate_ those sounds using TinyMusic. I'm pretty happy with how they turned out, and think they fit the game even better than the sound effects I had found.

### Development

We didn't think it was necessary to use `canvas`, and opted use `svg` for the large majority of the game. This gave us the benefit of being able scale graphics without having to implement a lot of extra code, use CSS to flip the colors when the layers were toggled, as well as easily develop graphics. In a lot of cases, I hard coded graphics such as the [death animation](https://github.com/starzonmyarmz/js13k-2018/blob/gh-pages/index.html#L135-L159) or the death counter, and then Brad would step in and wire it up with JavaScript.

I ran every graphic I created through [SVGOMG](https://jakearchibald.github.io/svgomg/) which helped keep our SVG super lightweight. However in some cases, I found it more performant to use plain old `rect`s or take advantage of SVG `pattern`s for the [numbers used](https://github.com/starzonmyarmz/js13k-2018/blob/gh-pages/index.html#L107-L118) in the death and level counter, as well as the [spikes](https://github.com/starzonmyarmz/js13k-2018/blob/gh-pages/index.html#L80-L93).

Knowing that Brad would be the mastermind behind 99% of the JavaScript, I ultimately left the decision to him whether we should roll our own game mechanics or use an existing library. We both felt it would be more fun to write our own. Not only that, we would have a lot more control over the amount of code needed. I did hang out with him quite a bit, and watch him build a lot of the mechanics. Using ES6 made the vast majority of the code easier to write, and we didn't end up having to polyfill anything if I recall.

For level design, Brad had created the ability to bootstrap levels quickly just by passing in an array of coordinates, and that would spit out the character, goal, and platforms - including the layer they should exist on, and if they should be spikes or not. After getting a little burnt out on level design, I messed around with creating some dynamically generated levels. That presented a different challenge of introducing RNG while keeping the levels completable.

We shot for the stars, and developed right up to the end. Within the last 12 hours before the deadline we rolled out Gamepad support, the ability to share and play custom levels, and wrote another song to play when the game is completed.

### Tooling and 13k

Our tooling was pretty minimal. All we did was run our JS, CSS, and HTML through minifiers - that's it. We decided to build everything as minimal as possible from the beginning, so we didn't really have to go back and rework anything to hit the 13k limit.

In fact, we were always so far under 13k that with five days left, Brad decided to roll out a custom level editor! That actually turned out to be a huge help because it made it a lot faster to test out ideas, and generate level code that we could just paste into our game. We though it was so cool we decided to include it as a bonus with a day left before the deadline!

### Playtesting

Aside from having our kids play the game frequently (and they did!) we invited a few friends to play with about a week left in the competition. We received some really good feedback - though nothing too major. All in all - they felt that the game mechanics made sense, and was fairly easy to figure out. Looking back I wish we had people play test it sooner - only because we were scrambling around with a few days left to finish building the game. If we had received more drastic feedback, we would have been in a really tight spot.

### Wrap Up

Brad and I had a blast working on the js13k this year! I'm really grateful to Brad and all his help, our friends who took the time to playtest and give us feedback, and especially our families who gave endless support, and endured hours and hours of that music loop!

If you haven't yet, make sure you checkout our game [ONOFF](https://js13kgames.com/entries/onoff)!
