#### Fuel Rules desde FHO
```sql
SELECT 
    r.[id],
    r.[id] as list_id,
    3 as type,                  -- para fuel rules
    fr.[type] as list_type,
    r.[name],
    r.[description],
    r.[status],
    r.[content_summary],
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f1]) AS  fuel1,
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f2]) AS  fuel2,
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f3]) AS  fuel3,
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f4]) AS  fuel4,
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f5]) AS  fuel5,
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f6]) AS  fuel6,
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f7]) AS  fuel7,
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f8]) AS  fuel8,
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f9]) AS  fuel9,
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f10]) AS fuel10,
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f11]) AS fuel11,
    (SELECT [code] FROM [HO_DATA].[dbo].[products] WHERE id = fr.[f12]) AS fuel12
FROM [HO_DATA].[dbo].[fuels_rules] fr 
JOIN [HO_DATA].[dbo].[rules] r ON r.id = fr.id 
WHERE r.[status] > 0
```