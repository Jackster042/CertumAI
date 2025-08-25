CREATE TYPE "public"."job_infos_experience_level" AS ENUM('junior', 'mid-level', 'senior');--> statement-breakpoint
ALTER TABLE "job_info" ALTER COLUMN "experienceLevel" SET DATA TYPE "public"."job_infos_experience_level" USING "experienceLevel"::text::"public"."job_infos_experience_level";--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "jobInfoId" SET DATA TYPE uuid;--> statement-breakpoint
DROP TYPE "public"."job_info_experience_level";