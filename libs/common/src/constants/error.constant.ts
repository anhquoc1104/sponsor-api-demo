export const ERROR_CODE = {
  NOT_EXIST: 'not_exists',
  EXISTS: 'existed',
  AUTH: {
    UNAUTHORIZED: 'auth.unauthorized',
    FORBIDDEN: 'auth.forbidden',
    WRONG_PASSWORD: 'auth.wrong_password',
    NOT_ALLOWED: 'auth.not_allowed',
    SAME_PASSWORD: 'auth.update_same_password',
    EXPIRED_VERIFY_EMAIL_SESSION: 'auth.expired_verify_email_session',
  },
  USER: {
    NO_PERMISSIONS: 'user.no_permissions',
    SAME_EMAIL: 'user.same_email',
    DEACTIVATED: 'user.deactivated',
  },
  GROUP: {
    NOT_MATCH_USER: 'group.not_match_user',
  },
  SPONSOR: {
    END_DATE: {
      BEFORE_NOW: 'sponsor.end_date.before_now',
      AFTER_START_DATE: 'sponsor.end_date.after_start_date',
    },
    EXPIRATION_DATE: {
      BEFORE_END_DATE: 'sponsor.expiration_date.before_end_date',
      AFTER_START_DATE: 'sponsor.expiration_date.after_start_date',
    },
    DISPLAY_STATUS: {
      NOT_DRAFT: 'sponsor.display_status.not_draft',
      INVALID: 'sponsor.display_status.invalid',
    },
    PUBLISHER: {
      NOT_ALLOWED_CHANGE_STATUS: 'sponsor.publisher.not_allowed_change_status',
      NOT_ALLOWED_CHANGES: 'sponsor.publisher.not_allowed_changes',
    },
    EXPIRED: 'sponsor.expired',
  },
};
