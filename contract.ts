export type UserRole = "CANDIDATE" | "COMPANY" | "INSTITUTION" | "ADMIN";

export type UserStatus = "ACTIVE" | "SUSPENDED" | "DISABLED";

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export type CandidateType = "STUDENT" | "GRADUATE";

export type OfferType =
  | "ACADEMIC_INTERNSHIP"
  | "PROFESSIONAL_INTERNSHIP"
  | "EMPLOYMENT";

export type OfferStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "PUBLISHED"
  | "REJECTED"
  | "SUSPENDED"
  | "CLOSED";

export type ApplicationStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "INTERVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN";

export type AgreementStatus =
  | "DRAFT"
  | "COMPANY_SIGNED"
  | "CANDIDATE_SIGNED"
  | "INSTITUTION_SIGNED"
  | "ACTIVE"
  | "CANCELLED"
  | "COMPLETED";

export type InternshipStatus =
  | "PLANNED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "TERMINATED";

export type LearningResourceType = "ARTICLE" | "VIDEO" | "WEBINAR";

export type LearningResourceStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type MentorStatus = "ACTIVE" | "UNAVAILABLE";

export type MentorshipRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type ReportValidationStatus = "PENDING" | "VALIDATED" | "REJECTED";

export type AgreementSignerRole = "COMPANY" | "CANDIDATE" | "INSTITUTION";

export type EmploymentOutcomeType =
  | "EMPLOYED_CDI"
  | "EMPLOYED_CDD"
  | "SELF_EMPLOYED"
  | "UNEMPLOYED"
  | "UNKNOWN";

export type ErrorCode =
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "ACCOUNT_SUSPENDED"
  | "VALIDATION_ERROR"
  | "RESOURCE_NOT_FOUND"
  | "EMAIL_ALREADY_USED"
  | "PROFILE_INCOMPLETE"
  | "COMPANY_NOT_VERIFIED"
  | "STUDENT_NOT_VERIFIED"
  | "OFFER_NOT_EDITABLE"
  | "OFFER_NOT_PUBLISHED"
  | "OFFER_CLOSED"
  | "APPLICATION_ALREADY_EXISTS"
  | "INVALID_APPLICATION_TRANSITION"
  | "AGREEMENT_SIGNATURE_ORDER_INVALID"
  | "AGREEMENT_DOCUMENT_CHANGED"
  | "UPLOAD_INVALID"
  | "RATE_LIMITED";

export interface ApiSuccess<T> {
  data: T;
  meta: {
    requestId: string;
  };
}

export interface ApiError {
  error: {
    code: ErrorCode;
    message: string;
    fields: Record<string, string> | null;
    requestId: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    requestId: string;
  };
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}
