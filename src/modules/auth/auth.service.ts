import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/schema/user.schema';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { confirmEmailLink } from 'src/utils/confirmEmailLink';
import { CustomerService } from '../customer/customer.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private customerService: CustomerService,
        private jwtService: JwtService,
        private emailService: EmailService,
    ) { }

    async auth(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);

        if (user) {
            const match = await bcrypt.compare(password, user.password);

            const customer = await this.customerService.getCustomerByUser(user.id);

            if(match) {

                if(!user.email_verified) {
                    await this.emailService.sendMail(
                        user.email, 
                        'Confirmação de email', 
                        'Kimochism 気持ち',
                        'emailConfirmation',
                        { 
                            link: await confirmEmailLink(user.id.toString()),
                            name: customer.full_name.split(" ")[0]
                        }
                    );
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
