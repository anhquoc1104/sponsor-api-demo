import {
  ACCOUNT_TYPE,
  BaseCreateDTO,
  BaseQueryFilterDTO,
  BaseUpdateDTO,
  Common,
  ENUM_STATUS,
} from '@app/common';
import { PERMISSION } from '@app/common/enums/permission.enum';
import {
  AtLeastLowerCase,
  AtLeastNumber,
  AtLeastSpecialCharater,
  AtLeastUpperCase,
  VerifyConfirmPassword,
} from '@app/common/validators/property.validators';
import {
  ApiHideProperty,
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateUserDTO extends BaseCreateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Username',
    example: 'toan.pham',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    required: true,
    type: String,
    description: 'Account Email',
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Validate(AtLeastUpperCase)
  @Validate(AtLeastLowerCase)
  @Validate(AtLeastSpecialCharater)
  @Validate(AtLeastNumber)
  @ApiProperty({
    required: true,
    type: String,
    description: 'Account Password',
    example: 'Sponsor1000!',
  })
  password: string;

  @IsEnum(ACCOUNT_TYPE)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    enum: ACCOUNT_TYPE,
    description: 'Account Type',
    example: ACCOUNT_TYPE.ADMIN,
  })
  type: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  })
  group?: mongoose.Schema.Types.ObjectId | null;

  @ValidateIf((property) =>
    Common.compareValues(property.type, ACCOUNT_TYPE.ADMIN),
  )
  @ArrayNotEmpty()
  @IsEnum(PERMISSION, { each: true })
  @ApiProperty({
    type: [String],
    enum: PERMISSION,
    description: 'Account Permissions',
  })
  permissions?: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'image of attribute sponsor',
    example: '/public/image/followme.jpg',
  })
  image: string;
}

export class FindUserDTO extends BaseQueryFilterDTO {
  @IsEnum(ACCOUNT_TYPE)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
    enum: ACCOUNT_TYPE,
    description: 'Account Type',
    example: ACCOUNT_TYPE.ADMIN,
  })
  type: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  })
  group?: mongoose.Schema.Types.ObjectId | null;
}
export class UpdateUserDTO extends IntersectionType(
  OmitType(CreateUserDTO, ['username', 'type', 'password']),
  BaseUpdateDTO,
) {}

export class ForgotPasswordDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    required: true,
    type: String,
    description: 'Account Email',
    example: 'example@gmail.com',
  })
  email: string;

  @IsOptional()
  @ApiHideProperty()
  @ApiProperty({
    required: false,
    type: String,
    enum: ACCOUNT_TYPE,
    description: 'Account Type',
    example: ACCOUNT_TYPE.ADMIN,
  })
  type?: string;
}

export class VerifyEmailSessionDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    type: String,
    description: 'Verify Email Session',
    example: 'example@gmail.com',
  })
  code: string;
}

export class ResetPasswordDTO extends IntersectionType(
  PartialType(VerifyEmailSessionDTO),
  BaseUpdateDTO,
) {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Validate(AtLeastUpperCase)
  @Validate(AtLeastLowerCase)
  @Validate(AtLeastSpecialCharater)
  @Validate(AtLeastNumber)
  @ApiProperty({
    required: false,
    type: Number,
    description: 'Password (Required Only With Manual Request Type)',
    example: 'Example2024!',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Validate(VerifyConfirmPassword, ['password'])
  @ApiProperty({
    required: false,
    type: Number,
    description: 'Retry Password (Required Only With Manual Request Type)',
    example: 'Example2024!',
  })
  confirm_password: string;
}

export class UpdateProfileDTO extends BaseUpdateDTO {
  // @IsOptional()
  // @IsMongoId()
  // @ApiProperty({
  //   required: false,
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: null,
  // })
  // group?: mongoose.Schema.Types.ObjectId | null;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    required: true,
    type: String,
    description: 'Account Email',
    example: 'example@gmail.com',
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'image of attribute sponsor',
    example: '/public/image/followme.jpg',
  })
  image: string;
}
export class UpdateUserStatusDTO extends BaseUpdateDTO {
  @IsNotEmpty()
  @IsEnum(ENUM_STATUS)
  @ApiProperty({
    required: true,
    type: String,
    description: 'Working Status',
    example: ENUM_STATUS.ACTIVE,
  })
  status: ENUM_STATUS;
}
