import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { ClubProvider } from './ClubContext';
import { MemberProvider } from './MemberContext';
import { AuditProvider } from './AuditContext';
import { RegisterProvider } from './RegisterContext';

const ContextProviders = ({ children }: { children: ReactNode }) => {
	return (
		<AuthProvider>
			<ClubProvider>
				<MemberProvider>
					<AuditProvider>
						<RegisterProvider>{children}</RegisterProvider>
					</AuditProvider>
				</MemberProvider>
			</ClubProvider>
		</AuthProvider>
	);
};

export default ContextProviders;
