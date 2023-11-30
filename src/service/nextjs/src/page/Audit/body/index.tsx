import React, { Dispatch, SetStateAction, useContext, useRef } from 'react';
import AuditRegisterButton from './register/button';
import AuditPageBodyStyle from './index.style';
import { DownArrowIcon, ExportIcon } from './icon';
import AuditDocumentPreview from './preview';
import { Audit, AuditContext } from 'context/AuditContext';
import { Club } from 'context/ClubContext';
import ReactToPrint from 'react-to-print';
import AuditExport from '../export';
import AuditExportStyle, { AuditExportDocumentStyle } from '../export/index.style';
import { resizeBeforeGetContent } from './viewer/footer';

const Header = (props: { club: Club; audits: Audit[] | null }) => {
	const { club, audits } = props;
	const printRef = useRef<HTMLDivElement>(null);

	return (
		<div>
			<span>회계 문서</span>
			<div>
				<span>|</span>
				<ReactToPrint
					pageStyle={`
						@page {
							size: 210mm 290mm;
							margin: 12mm 10mm;
						}
						@media print {
							.${AuditExportStyle} {
								> div {
									page-break-before: always;
								}
							}
							body {
								-webkit-print-color-adjust: exact;
							}
						}
					`}
					onBeforeGetContent={() => {
						if (printRef.current) {
							printRef.current.style.display = 'block';
							{
								const children = printRef.current.children as HTMLCollectionOf<HTMLDivElement>;

								for (let i = 0; i < children.length; i++) {
									if (children[i].className !== AuditExportDocumentStyle) {
										continue;
									}
									resizeBeforeGetContent(children[i].children[0] as HTMLElement);
								}
							}
						}
					}}
					onAfterPrint={() => {
						if (printRef.current) {
							printRef.current.style.display = 'none';
						}
					}}
					trigger={() => (
						<div>
							<span>회계 장부 내보내기</span>
							<ExportIcon width={24} height={24} />
						</div>
					)}
					content={() => (printRef.current as HTMLDivElement) || null}
				/>
			</div>
			<div>
				<AuditExport divRef={printRef} club={club} audits={audits} />
			</div>
		</div>
	);
};

const Body = (props: {
	audits: Audit[] | null;
	setAudits: Dispatch<SetStateAction<Audit[] | null>>;
}) => {
	const { audits, setAudits } = props;

	return (
		<div>
			<div>
				<span>날짜별</span>
				<DownArrowIcon
					width={22}
					height={12}
					onClick={() => {
						alert('업데이트 예정입니다!');
					}}
				/>
			</div>
			<div>
				<div>
					<AuditRegisterButton />
					{audits?.map((audit, index) => {
						return (
							<AuditDocumentPreview
								key={index}
								index={index}
								audit={audit}
								audits={audits}
								setAudits={setAudits}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
	console.log(audits, setAudits);
};

const AuditPageBody = (props: { club: Club }) => {
	const { club } = props;
	const { audits, setAudits } = useContext(AuditContext);

	return (
		<div className={AuditPageBodyStyle}>
			<Header club={club} audits={audits} />
			<Body audits={audits} setAudits={setAudits} />
		</div>
	);
	console.log(club);
};

export default AuditPageBody;
