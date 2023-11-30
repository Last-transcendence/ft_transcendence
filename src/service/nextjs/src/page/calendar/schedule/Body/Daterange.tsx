import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateContainerStyle, datePickerStyle } from './Daterange.style';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from './icon';
import { TitleContainer } from './TitleContainer';

const DateRangePicker: React.FC<{
	setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
	setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}> = props => {
	const { setStartDate, setEndDate } = props;
	const [startDate, _setStartDate] = useState<Date | null>(null);
	const [endDate, _setEndDate] = useState<Date | null>(null);

	return (
		<div className={DateContainerStyle}>
			<TitleContainer
				titleIcon={<CalendarIcon height={27} width={27} />}
				title="기간"
				subtitle="달력에서 선택해주세요"
			/>
			<div className={datePickerStyle}>
				<DatePicker
					selected={startDate}
					onChange={(dates: [Date | null, Date | null]) => {
						const [start, end] = dates;
						_setStartDate(start);
						_setEndDate(end);

						// 부모 컴포넌트로 날짜 정보 전달
						setStartDate(start);
						setEndDate(end);
					}}
					startDate={startDate}
					endDate={endDate}
					selectsRange={true}
					locale={ko}
					inline={true}
				/>
			</div>
		</div>
	);
};

export default DateRangePicker;
