const _stories = [
	{
		id: 'story-1',
		imageUrl: 'images/1.jpeg',
		text: '1. Top Things To Do In Ooty',
		duration: 3000,
		weight: 1,
	},
	{
		id: 'story-2',
		imageUrl: 'images/2.jpeg',
		text: '2. Surrounded by the Nilgiris and stunning lakes and forests, the resort town of Ooty in Tamil Nadu is a popular getaway in South India',
		duration: 4000,
		weight: 1,
	},
	{
		id: 'story-3',
		imageUrl: 'images/3.jpeg',
		text: '3. A fun way to explore this hill station is to hop on a toy train that will take you across the countryside',
		duration: 5000,
		weight: 1,
	},
	{
		id: 'story-4',
		imageUrl: 'images/4.jpeg',
		text: '4. Once a British Raj summer resort, you can still find Colonial influences in Ooty\'s many historical buildings such as St. Stephen\'s Church',
		duration: 3000,
		weight: 2,
	},
	{
		id: 'story-5',
		imageUrl: 'images/5.jpeg',
		text: '5. Ooty Lake is a must-visit to enjoy a peaceful boat ride. A major tourist attraction, this artificial lake was constructed in 1824',
		duration: 4000,
		weight: 2,
	},
	{
		id: 'story-6',
		imageUrl: 'images/6.jpeg',
		text: '6. To surround yourself with beauty, head to Ooty\'s Rose Garden in Vijayanagaram, which is the largest rose garden in India',
		duration: 5000,
		weight: 2,
	},
	{
		id: 'story-7',
		imageUrl: 'images/7.jpeg',
		text: '7. If Rose Garden is not enough, then explore the Botanical Garden that houses a wide range of exotic and indigenous plants, shrubs, trees',
		duration: 3000,
		weight: 3,
	},
	{
		id: 'story-8',
		imageUrl: 'images/8.jpeg',
		text: '8. About 28km away from Ooty town is the stunning Avalanche Lake. Trek around to explore the region and enjoy a picnic by the lake',
		duration: 4000,
		weight: 3,
	},
	{
		id: 'story-9',
		imageUrl: 'images/9.jpeg',
		text: '9. While there are many treats to indulge in, you cannot miss picking a range of delicious hand-made Ooty chocolates',
		duration: 4000,
		weight: 3,
	},
];

function _api_delay(min = 1, max = 5) {
	const ms = (min + Math.random() * (max - min)) * 1000;
	return new Promise(resolve => setTimeout(resolve, ms));
}

function _api_log(logName, data) {
	if(data) {
		console.log(`[API-CALL] ${ logName }`, data);
	} else {
		console.log(`[API-CALL] ${ logName }`);
	}
}

export function getStoriesMeta() {
	_api_log('getStoriesMeta');
	return {
		length: _stories.length,
		idList: _stories.map(story => story.id),
		weightList: _stories.map(story => story.weight),
	};
}

export function getStories() {
	_api_log('getStories');
	return _stories;
}

export async function ajaxGetStories() {
	_api_log('ajaxGetStories');
	await _api_delay();
	return _stories;
}

export async function ajaxGetStoryByIndex(index) {
	_api_log('ajaxGetStoryByIndex', { index });
	await _api_delay();
	return _stories[index];
}
