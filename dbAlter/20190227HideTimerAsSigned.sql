ALTER TABLE taxi_customer MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE transport_customer MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE cleaner_customer MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE windowcleaner_customer MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE lawnmower_customer MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE snowremoval_customer MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE fruitpicker_customer MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE programmer_customer MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;

ALTER TABLE taxi_seller MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE transport_seller MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE cleaner_seller MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE windowcleaner_seller MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE lawnmower_seller MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE snowremoval_seller MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE fruitpicker_seller MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;
ALTER TABLE programmer_seller MODIFY COLUMN hideTimer INT(8) NOT NULL DEFAULT 2147483647;


-- Set Back

ALTER TABLE taxi_customer MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE transport_customer MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE cleaner_customer MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE windowcleaner_customer MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE lawnmower_customer MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE snowremoval_customer MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE fruitpicker_customer MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE programmer_customer MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;

ALTER TABLE taxi_seller MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE transport_seller MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE cleaner_seller MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE windowcleaner_seller MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE lawnmower_seller MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE snowremoval_seller MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE fruitpicker_seller MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;
ALTER TABLE programmer_seller MODIFY COLUMN hideTimer INT(8) UNSIGNED NOT NULL DEFAULT 4294967295;

