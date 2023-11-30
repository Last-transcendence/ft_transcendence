import { css } from '@emotion/css';
import { A4PageStyle } from 'page/page.style';

const AuditDocumentViewerStyle = css(A4PageStyle, {
	height: 770,
	display: 'grid',
	gridTemplateRows: '726px 44px',
});

export default AuditDocumentViewerStyle;
