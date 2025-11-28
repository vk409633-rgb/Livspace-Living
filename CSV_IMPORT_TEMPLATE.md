# CSV Import Template for Products

## Format
The CSV file should have the following columns (in order):

```
name,sku,category,supplier,price,mrp,stock,description,specifications,images,weight,dimensions
```

## Column Descriptions

- **name**: Product name (required)
- **sku**: Stock Keeping Unit - unique identifier (required)
- **category**: Category slug (required, must exist in database)
- **supplier**: Supplier slug (optional, must exist if provided)
- **price**: Selling price in INR (required)
- **mrp**: Maximum Retail Price (optional)
- **stock**: Available quantity (required)
- **description**: Full product description (optional)
- **specifications**: JSON string of specifications (optional)
- **images**: Comma-separated image URLs (optional)
- **weight**: Weight in kg (optional)
- **dimensions**: Product dimensions (optional)

## Example CSV

```csv
name,sku,category,supplier,price,mrp,stock,description,specifications,images,weight,dimensions
"Premium Vitrified Tile 600x600mm",VIT-600-100,vitrified-tiles,kajaria,45,60,500,"High-quality vitrified floor tiles","{""size"":""600x600mm"",""finish"":""Glossy"",""color"":""Beige""}","/products/tile-1.jpg",12.5,"600x600x10mm"
"Ceramic Wall Tile 300x450mm",CER-300-101,ceramic-tiles,somany,28,35,800,"Elegant ceramic wall tiles","{""size"":""300x450mm"",""finish"":""Glossy"",""color"":""White""}","/products/tile-2.jpg",4.5,"300x450x8mm"
"LED Panel Light 36W",LED-PAN-102,lighting,,850,1200,100,"Energy-efficient LED panel","{""wattage"":""36W"",""color"":""Cool White""}","/products/light-1.jpg",1.5,""
```

## Important Notes

1. **Escape quotes in JSON**: Use double quotes ("") inside JSON strings
2. **Category must exist**: Create categories first before importing products
3. **Supplier is optional**: Leave empty if not applicable
4. **SKU must be unique**: Each product needs a unique SKU
5. **Specifications**: Must be valid JSON format
6. **Images**: Can be multiple URLs separated by commas
7. **Numeric values**: Don't use currency symbols or commas

## Steps to Import

1. Prepare your CSV file following the template above
2. Log in to admin dashboard
3. Navigate to "Bulk Import" section
4. Upload your CSV file
5. Review the preview
6. Click "Import" to process

## Validation Rules

- Name: Required, max 255 characters
- SKU: Required, unique, alphanumeric with hyphens
- Category: Must exist in database
- Price: Required, positive number
- Stock: Required, non-negative integer
- Weight: Positive number (if provided)

## Error Handling

If any row fails validation:
- The row will be skipped
- Error will be logged
- Other valid rows will be imported
- You'll receive a detailed error report

## Sample Data (200 SKUs)

For a complete sample with 200 products, download the sample CSV from the admin panel or contact support.
