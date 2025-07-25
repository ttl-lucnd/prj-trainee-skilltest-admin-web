import adminAccountEn from './en/admin-account.json';
import appEn from './en/app.json';
import commonEn from './en/common.json';
import errorEn from './en/error.json';
import fieldEn from './en/field.json';
import loginEn from './en/login.json';
import sidebarEn from './en/sidebar.json';
import yupEn from './en/yup.json';
import adminAccountJa from './ja/admin-account.json';
import appJa from './ja/app.json';
import commonJa from './ja/common.json';
import errorJa from './ja/error.json';
import fieldJa from './ja/field.json';
import loginJa from './ja/login.json';
import sidebarJa from './ja/sidebar.json';
import yupJa from './ja/yup.json';
import questionsJa from './ja/questions.json';
import questionsEn from './en/questions.json';
import subjectJa from './ja/subject.json';
import subjectEn from './en/subject.json';
import vocabulariesJa from './ja/vocabularies.json';
import vocabulariesEn from './en/vocabularies.json';
import packageJa from './ja/package.json';
import packageEn from './en/package.json';

const messages = {
  ja: {
    login: loginJa,
    common: commonJa,
    sidebar: sidebarJa,
    adminAccount: adminAccountJa,
    error: errorJa,
    yup: yupJa,
    field: fieldJa,
    app: appJa,
    questions: questionsJa,
    subjects: subjectJa,
    vocabularies: vocabulariesJa,
    packages: packageJa,
  },
  en: {
    login: loginEn,
    common: commonEn,
    sidebar: sidebarEn,
    adminAccount: adminAccountEn,
    yup: yupEn,
    field: fieldEn,
    app: appEn,
    error: errorEn,
    questions: questionsEn,
    subjects: subjectEn,
    vocabularies: vocabulariesEn,
    packages: packageEn,
  },
};

export default messages;
