import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/schema/user.schema';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { sendEmail } from '../../utils/sendEmail';
import { confirmEmailLink } from 'src/utils/confirmEmailLink';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async auth(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);

        if (user) {
            const match = await bcrypt.compare(password, user.password);

            if(match) {

                if(!user.email_verified) {
                    await sendEmail(user.email, await confirmEmailLink(user.id.toString()));
                }

                return { email: user.email, id: user.id };
            }
            return null;
        }
        return null;
    }

    async login(user: User) {
        return {
            access_token: this.jwtService.sign({ email: user.email }),
        };
    }
}
