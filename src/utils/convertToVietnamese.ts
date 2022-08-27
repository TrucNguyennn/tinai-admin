import {
  AlcoholEnum,
  EducationEnum,
  GenderEnum,
  MaritalStatusEnum,
  ReligionEnum,
} from '@/@type';

export const ConvertMaritalStatusEnum = (marital: string): string => {
  switch (marital) {
    case MaritalStatusEnum.SINGLE:
      return `Độc thân`;
      break;
    case MaritalStatusEnum.MARRIED:
      return `Đã kết hôn`;
      break;
    case MaritalStatusEnum.DIVORCED:
      return `Đã li hôn`;
      break;
    default:
      return `Chưa có`;
      break;
  }
};

export const ConvertAlcoholEnum = (alcohol: string): string => {
  switch (alcohol) {
    case AlcoholEnum.SOMETIMES:
      return `Thỉnh thoảng`;
      break;
    case AlcoholEnum.USUALLY:
      return `Thường xuyên`;
      break;
    case AlcoholEnum.NEVER:
      return `Không bao giờ`;
      break;
    default:
      return ``;
      break;
  }
};

export const ConvertGenderEnum = (gender: string): string => {
  switch (gender) {
    case GenderEnum.FEMALE:
      return `Nữ`;
      break;
    case GenderEnum.MALE:
      return `Nam`;
      break;
    case GenderEnum.OTHER:
      return `Khác`;
      break;
    default:
      return ``;
      break;
  }
};

export const ConvertReligionEnum = (religion: string): string => {
  switch (religion) {
    case ReligionEnum.BUDDHISM:
      return `Phật giáo`;
      break;
    case ReligionEnum.GOD:
      return `Thiên chúa giáo`;
      break;
    case ReligionEnum.NON_RELIGIONS:
      return `Không có`;
      break;
    case ReligionEnum.OTHER:
      return `Tôn giáo khác`;
      break;
    default:
      return ``;
      break;
  }
};

export const ConvertEducationEnum = (education: string): string => {
  switch (education) {
    case EducationEnum.PRIMARY:
      return `Cấp 1`;
      break;
    case EducationEnum.SECONDARY:
      return `Cấp 2`;
      break;
    case EducationEnum.HIGH_SCHOOL:
      return `Cấp 3`;
      break;
    case EducationEnum.UNIVERSITY:
      return `Đại học`;
      break;
    case EducationEnum.COLLEGE:
      return `Cao đẳng`;
      break;
    case EducationEnum.OTHER:
      return `Khác`;
      break;
    default:
      return `Không`;
      break;
  }
};
