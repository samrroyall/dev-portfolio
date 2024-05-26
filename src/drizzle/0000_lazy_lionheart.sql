CREATE TABLE `blogposts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL,
	`blurb` text NOT NULL,
	`text` text NOT NULL,
	`created_at` integer,
	`last_modified_at` integer
);
--> statement-breakpoint
CREATE TABLE `homesectionentries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`section_id` text NOT NULL,
	`title` text,
	`subtitles` blob NOT NULL,
	`text` text NOT NULL,
	`title_link` text,
	`created_at` integer,
	`last_modified_at` integer,
	FOREIGN KEY (`section_id`) REFERENCES `homesections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `homesections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order` integer NOT NULL,
	`title` text NOT NULL,
	`created_at` integer,
	`last_modified_at` integer
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`sessionId` text PRIMARY KEY NOT NULL,
	`expiry` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blogposts_slug_unique` ON `blogposts` (`slug`);--> statement-breakpoint
CREATE INDEX `slug` ON `blogposts` (`slug`);
