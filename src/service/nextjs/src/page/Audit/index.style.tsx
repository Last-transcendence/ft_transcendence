import { css } from '@emotion/css';
import { PageStyle } from 'page/page.style';

const AuditPageStyle = css(PageStyle, {
	display: 'grid',
	gridTemplateRows: 'auto auto',
	gap: '40px',
});

export default AuditPageStyle;
