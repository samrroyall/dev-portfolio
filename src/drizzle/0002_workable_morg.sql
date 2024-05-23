CREATE TABLE `blogposts` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL,
	`blurb` text NOT NULL,
	`text` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIME) NOT NULL,
	`last_modified_at` text DEFAULT (CURRENT_TIME) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `slug` ON `blogposts` (`slug`);