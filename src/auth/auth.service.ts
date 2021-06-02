import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async auth(email: string, password: string): Promise<any> {

        const user = await this.userService.findOne(email);

        if (user) {
            const match = await bcrypt.compare(password, user.password);

            if(match) {
                return { email: user.email};
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
