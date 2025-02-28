import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // ✅ Import JwtModule
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // ✅ Đăng ký model User
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // ✅ Thêm secret key JWT (nên dùng biến môi trường)
      signOptions: { expiresIn: '1h' }, // ✅ Token có thời gian hết hạn
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // ✅ Xuất UsersService để module khác có thể sử dụng
})
export class UsersModule {}
