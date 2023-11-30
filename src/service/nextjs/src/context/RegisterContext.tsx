import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export type RegisterInfo = {
	name: string | undefined;
	email: string | undefined;
};

export const RegisterContext = createContext<{
	registerInfo: RegisterInfo | null;
	setRegisterInfo: Dispatch<SetStateAction<RegisterInfo | null>>;
}>({
	registerInfo: null,
	setRegisterInfo: () => {},
});

export const RegisterProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [registerInfo, setRegisterInfo] = useState<RegisterInfo | null>(null);

	return (
		<RegisterContext.Provider value={{ registerInfo, setRegisterInfo }}>
			{children}
		</RegisterContext.Provider>
	);
};
