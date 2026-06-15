"use client";

import { useEffect, useRef } from 'react';

const hideLauncherStyles = `
  #chatbot-toggle {
    display: none !important;
  }
`;

export default function HelpPage() {
	const chatbotHostRef = useRef(null);

	useEffect(() => {
		const toggle = document.getElementById('chatbot-toggle');
		if (toggle) {
			toggle.click();
		}

		let cancelled = false;

		const attachChatbot = () => {
			if (cancelled) return;

			const chatbotInput = document.getElementById('chatbot-input');
			const chatbotRoot = chatbotInput?.closest('div.fixed');

			if (chatbotRoot && chatbotHostRef.current) {
				chatbotRoot.style.position = 'relative';
				chatbotRoot.style.bottom = 'auto';
				chatbotRoot.style.right = 'auto';
				chatbotRoot.style.left = 'auto';
				chatbotRoot.style.top = 'auto';
				chatbotRoot.style.width = '100%';
				chatbotRoot.style.maxWidth = '100%';
				chatbotRoot.style.height = '650px';
				chatbotRoot.style.maxHeight = 'none';
				chatbotRoot.style.margin = '0';
				chatbotRoot.style.zIndex = '1';

				chatbotHostRef.current.appendChild(chatbotRoot);
				return;
			}

			window.requestAnimationFrame(attachChatbot);
		};

		window.requestAnimationFrame(attachChatbot);

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<main className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
			<style>{hideLauncherStyles}</style>
			<section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
				<div className="max-w-2xl space-y-4">
					<p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#FFA500]">
						Help Center
					</p>
					<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Ask the BlockTix assistant anything
					</h1>
					<p className="text-sm leading-6 text-white/75 sm:text-base">
						Use the chatbot to search events, check categories, and get quick answers without
						leaving the help page.
					</p>
				</div>
			</section>

			<section ref={chatbotHostRef} className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm sm:p-4" />
		</main>
	);
}
