import { Button, Box, Throbber } from '@rocket.chat/fuselage';
import React, { useState } from 'react';

import Page from '../../components/basic/Page';
import { useRoute } from '../../contexts/RouterContext';
import { useTranslation } from '../../contexts/TranslationContext';
import { useMethod } from '../../contexts/ServerContext';

const readMeUrl = 'https://github.com/RocketChat/Rocket.Chat.Apps-dev-environment/blob/master/README.md';

function AppsWhatIsIt() {
	const t = useTranslation();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const enable = useMethod('apps/go-enable');

	const appsRouter = useRoute('admin-apps');

	const handleClick = async () => {
		try {
			setLoading(true);
			await enable();
			appsRouter.push({});
		} catch (error) {
			setError(error);
		}
	};

	return <Page flexDirection='column'>
		<Page.Header title={t('Apps_WhatIsIt')} />
		<Page.ScrollableContent>
			{error && <Box fontScale='s1' maxWidth='x600' alignSelf='center'>{error.message}</Box>}
			{!error && <Box alignSelf='center' maxWidth='x600' width='full' withRichContent>
				<p>{t('Apps_WhatIsIt_paragraph1')}</p>
				<p>{t('Apps_WhatIsIt_paragraph2')}</p>
				<p>
					{t('Apps_WhatIsIt_paragraph3')}
					{' '}
					<a href={readMeUrl} target='_blank' rel='noopener noreferrer'>{readMeUrl}</a>
				</p>
				<p>{t('Apps_WhatIsIt_paragraph4')}</p>
				<Button primary disabled={loading} onClick={handleClick}>{loading ? <Throbber inheritColor /> : t('Enable')}</Button>
			</Box>}
		</Page.ScrollableContent>
	</Page>;
}

export default AppsWhatIsIt;
