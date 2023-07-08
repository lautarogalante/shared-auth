import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from './utils/config.service';
import { JwtAuthGuard } from './utils/guards/jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [AuthModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const privateKey = await configService.getPrivateKey();
                const publicKey = await configService.getPublicKey();

                return {
                    privateKey: privateKey,
                    publicKey: publicKey,
                    signOptions: {
                        algorithm: 'ES256',
                        expiresIn: '15m'
                    },
                };
            },
        }),
    ],
    providers: [
        JwtAuthGuard,
        ConfigService,
        {
            provide: JwtStrategy,
            useFactory: async (configService: ConfigService) => {
                const publicKey = await configService.getPublicKey();
                return new JwtStrategy(publicKey);
            },
            inject: [ConfigService]
        },
    ],
    exports: [AuthModule,JwtAuthGuard]
})
export class AuthModule {}
