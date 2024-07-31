import { enviroments } from '@/constants';
import { utf8ToHex } from '@/utils';
import { Blockfrost, Lucid, SignedMessage } from 'lucid-cardano';
import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

const authConfig = {
    providers: [
        CredentialProvider({
            name: "Cardano",
            credentials: {
                address: {
                    label: "Adress",
                    type: "text",
                    placeholder: "addr",
                },
                message: {
                    label: "Message",
                    type: "text",
                    placeholder: "0x0",
                },
                signature: {
                    label: "Signature",
                    type: "text",
                    placeholder: "0x0",
                },
            },
            async authorize(credentials): Promise<any> {
                try {
                    const lucid = await Lucid.new(
                        new Blockfrost(enviroments.blockfrost_api_url, enviroments.blockfrost_api_key),
                        enviroments.network,
                    );

                    const payload = utf8ToHex(credentials.message as string);
                    const hasSigned: boolean = lucid.verifyMessage(credentials.address as string, payload, credentials.signature as SignedMessage);

                    if (hasSigned) {
                        return {
                            id: credentials.address,
                        }
                    }
                    return null
                } catch (e) {
                    return null
                }

            }
        })
    ],
    pages: {
        signIn: '/' //sigin page
    }
} satisfies NextAuthConfig;

export default authConfig;