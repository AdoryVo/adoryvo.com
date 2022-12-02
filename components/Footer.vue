<template>
	<footer class="absolute? bottom-0 bg-dark border-t-2 border-slate-500 w-full">
		<div
			class="flex flex-wrap container items-center justify-between lg:w-2/3 text-white mx-auto py-8 px-6 lg:px-0"
		>
			<div id="leftDiv" class="flex items-center gap-x-4">
				<img src="/images/me-1728x1728.jpg" class="w-14 rounded-full" format="webp" alt="Picture of Adory" />

				<address class="not-italic">
					<strong>Adory Vo</strong>
					<br />
					<NuxtLink
						class="link-primary"
						to="mailto:business@adoryvo.com"
					>business@adoryvo.com</NuxtLink>
				</address>
			</div>

			<div id="rightDiv" class="sm:text-right mt-3 lg:mt-0">
				<div>
					Made with
					<i class="fas fa-heart text-light animate-heartbeat"></i>
					in San Diego.
				</div>
				<div>
					<a href="#" class="link-light">Back to top</a>
				</div>
			</div>
		</div>
	</footer>
</template>