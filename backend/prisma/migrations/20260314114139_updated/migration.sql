DO $$
BEGIN
  -- Only drop defaults if the columns exist (safer for fresh schemas)
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Order' AND column_name = 'customerName'
  ) THEN
    ALTER TABLE "Order"
      ALTER COLUMN "customerName" DROP DEFAULT,
      ALTER COLUMN "customerEmail" DROP DEFAULT,
      ALTER COLUMN "shippingAddress" DROP DEFAULT,
      ALTER COLUMN "phone" DROP DEFAULT;
  END IF;
END;
$$;
