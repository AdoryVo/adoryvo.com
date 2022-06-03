<template>
	<main>
		<BodyTitle>music</BodyTitle>
		<p>
			I enjoy listening to new music and curating various playlists in my spare time! Here are some of my favorite
			artists and projects.
		</p>

		<BodyHeading>
			Top 100 Projects as of April 2022
		</BodyHeading>
		<p>
			Roughly ordered into sections.
			<br>
			Click picture to zoom in, click off to zoom out.
		</p>
		<img class="hover:cursor-zoom-in focus:scale-125 duration-[2000ms]" tabindex="0" src="/images/fav-music.png"
			alt="Favorite projects Topster collage">

		<BodyHeading class="mb-2">Favorite Tracks</BodyHeading>
		<iframe src="https://open.spotify.com/embed/playlist/5Mx2GuWlNpbpYRix5VbQxx?utm_source=generator"
			class="rounded-lg" width="100%" height="380"
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />

		<BodyHeading class="mb-2">Profiles</BodyHeading>
		<div class="bg-dark inline-block p-3 rounded-lg">
			<img class="inline w-14 rounded-full mr-2" src="/images/me-144x144.jpg" alt="logo">
			<NuxtLink to="https://open.spotify.com/user/exobyterotmg" target="_blank"
				class="bg-green-500 hover:bg-green-600 rounded-full serif p-2 px-3">
				<i class="fa-brands fa-spotify mr-2 animate-pulse"></i>
				Follow on Spotify
			</NuxtLink>
		</div>
	</main>
</template>