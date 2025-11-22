# HappyNest Celebrations Website

A fully responsive, mobile-friendly website for HappyNest Celebrations - a small cake, décor, and gift business.

## 🎯 Features

- **Dynamic Product Loading**: Products are loaded from `data/catalogue.json`
- **Responsive Design**: Mobile-first design that works on all devices
- **Search Functionality**: Real-time product search
- **Category Filtering**: Filter by Cakes, Decorations, or Gifts
- **Quick Contact**: WhatsApp and Call buttons for easy customer contact
- **Lazy Loading**: Images load efficiently for better performance
- **Auto-Deployment**: GitHub Actions workflow for automatic deployment

## 📁 Project Structure

```
happynest-celebrations/
│
├── index.html              # Main HTML file
├── script.js               # JavaScript for dynamic content
├── data/
│   └── catalogue.json      # Product data (edit this to update products)
├── assets/                 # All images go here
│   ├── plum_cake.jpg
│   ├── birthday_decor.jpg
│   ├── flower_bouquet.jpg
│   └── ... (other images)
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment workflow
└── README.md               # This file
```

## 🚀 Getting Started

### 1. Add Your Images

1. Place all product images in the `assets/` folder
2. Use descriptive filenames (e.g., `chocolate_cake.jpg`, `birthday_decor.jpg`)
3. Recommended image size: 800x600px or similar aspect ratio
4. Supported formats: JPG, PNG, WebP

### 2. Edit Product Catalogue

Edit `data/catalogue.json` to add, remove, or modify products:

```json
{
  "cakes": [
    {
      "id": "cake1",
      "title": "Rich Plum Cake",
      "description": "Alcohol / Non-alcohol, loaded with dry fruits",
      "price": "₹500",
      "image": "assets/plum_cake.jpg"
    }
  ],
  "decorations": [...],
  "gifts": [...]
}
```

**Fields:**
- `id`: Unique identifier (e.g., "cake1", "decor2")
- `title`: Product name
- `description`: Product description
- `price`: Price (include currency symbol)
- `image`: Path to image file (must be in `assets/` folder)

### 3. Test Locally

1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```
3. Visit `http://localhost:8000` in your browser

## 🌐 Deployment

### Option 1: GitHub Pages (Recommended)

1. **Create a GitHub Repository**
   - Create a new repository on GitHub
   - Name it `happynest-celebrations` (or any name you prefer)

2. **Push Your Code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/happynest-celebrations.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy on every push to `main`

4. **Access Your Site**
   - Your site will be available at: `https://YOUR_USERNAME.github.io/happynest-celebrations/`
   - It may take a few minutes for the first deployment

### Option 2: Vercel

1. **Install Vercel CLI** (optional, or use web interface)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   Or visit [vercel.com](https://vercel.com) and:
   - Click "New Project"
   - Import your GitHub repository
   - Deploy (no build settings needed)

3. **Access Your Site**
   - Vercel will provide a URL like: `https://happynest-celebrations.vercel.app`

## 📝 Customization

### Update Contact Information

Edit the contact details in `index.html`:
- WhatsApp: Search for `wa.me/919742349239` and replace with your number
- Phone: Search for `tel:+919742349239` and replace with your number

### Change Colors

The website uses TailwindCSS. To change colors:
- Edit the color classes in `index.html` (e.g., `text-pink-500`, `bg-pink-500`)
- Or customize Tailwind config if using a build process

### Add Social Media Links

Update the social media links in the footer section of `index.html`:
```html
<a href="YOUR_FACEBOOK_URL" ...>
<a href="YOUR_INSTAGRAM_URL" ...>
<a href="YOUR_TWITTER_URL" ...>
```

## 🔧 Troubleshooting

### Images Not Loading
- Ensure image paths in `catalogue.json` start with `assets/`
- Check that image files exist in the `assets/` folder
- Verify image filenames match exactly (case-sensitive)

### Products Not Showing
- Check browser console for errors (F12)
- Verify `catalogue.json` is valid JSON (use a JSON validator)
- Ensure the JSON file is in the `data/` folder

### GitHub Pages Not Deploying
- Check GitHub Actions tab for workflow errors
- Ensure the workflow file is in `.github/workflows/deploy.yml`
- Verify repository settings allow GitHub Pages

## 📱 Mobile Features

- Sticky bottom CTA bar on mobile devices
- Responsive navigation menu
- Touch-friendly buttons and cards
- Optimized images for mobile viewing

## 🎨 Design Features

- Clean, modern UI with TailwindCSS
- Smooth animations and hover effects
- Card-based product layout
- Fast loading with lazy image loading
- Accessible design with proper ARIA labels

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For issues or questions:
- Check the troubleshooting section above
- Review the code comments in `script.js`
- Contact: WhatsApp or Call (see contact info in footer)

---

**Happy Celebrations! 🎉**

