# Student Portfolio Template

A **complete GitHub repository** for creating a professional student resume/portfolio website. Designed for learning **Git basics**, **GitHub-Jira integration**, and **GitHub Actions CI/CD pipeline**.

## 🚀 Quick Start

### Using This Template

1. **Create your repository:**
   - Click **"Use this template"** button above
   - Name your repository: `<your-username>.github.io` (this enables GitHub Pages)
   - Make sure it's public (required for free GitHub Pages)

2. **Clone locally:**
   ```bash
   git clone https://github.com/<your-username>/<your-username>.github.io.git
   cd <your-username>.github.io
   ```

3. **Start customizing:**
   - Replace placeholder content with your information
   - Add your photos to `assets/images/`
   - Update links and contact information

4. **Deploy:**
   - Push changes to main branch
   - Your site will be live at: `https://<your-username>.github.io`

## 📚 Learning Git Basics

This template is designed for hands-on Git practice. Complete these exercises in order:

### 1. Basic Git Commands

```bash
# Check repository status
git status

# View commit history
git log --oneline

# See what changed
git diff
```

**Practice Exercise:** Make a small change to `index.html`, then:
```bash
git add index.html
git commit -m "Update homepage title"
git push origin main
```

### 2. Branching Workflow

```bash
# Create and switch to a new branch
git checkout -b feature/about-page

# Make changes to about.html
# Add and commit your changes
git add about.html
git commit -m "Add personal information to about page"

# Switch back to main
git checkout main

# Merge your feature branch
git merge feature/about-page

# Push changes
git push origin main
```

**Practice Exercises:**
- Create a `feature/projects` branch and add a new project
- Create a `feature/contact` branch and update contact information
- Practice merging and resolving any conflicts

### 3. Advanced Git Operations

```bash
# Undo the last commit (keep changes)
git reset --soft HEAD~1

# Undo changes to a file
git checkout -- filename.html

# View detailed history
git log --graph --oneline --all

# Rebase for clean history
git checkout feature/new-feature
git rebase main
```

**Practice Exercises:**
- Intentionally create a merge conflict and resolve it
- Practice rebasing a feature branch onto main
- Use `git revert` to undo a commit safely

### 4. Remote Operations

```bash
# Add a remote repository
git remote add upstream https://github.com/original-repo.git

# Fetch updates from remote
git fetch origin

# Pull latest changes
git pull origin main

# Push to different branch
git push origin feature/new-feature
```

## 🔗 GitHub Integration

### Pull Requests Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feature/experience-page
   ```

2. **Make changes and commit:**
   ```bash
   git add experience.html
   git commit -m "Add internship experience"
   git push origin feature/experience-page
   ```

3. **Create Pull Request:**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your feature branch
   - Write descriptive title and description
   - Request review (if working in a team)

4. **Merge and cleanup:**
   ```bash
   git checkout main
   git pull origin main
   git branch -d feature/experience-page
   ```

### Working with Issues

- Create issues for new features or bugs
- Reference issues in commits: `git commit -m "Fix navigation bug (#5)"`
- Close issues via commits: `git commit -m "Add contact form, closes #3"`

## 🎯 Jira Integration

### Smart Commits

Connect your commits to Jira tickets using Smart Commit syntax:

```bash
# Update Jira issue with comment
git commit -m "PROJ-101 #comment Added About Me section with personal background"

# Transition issue to "In Progress"
git commit -m "PROJ-102 #in-progress Working on projects showcase page"

# Mark issue as done
git commit -m "PROJ-103 #done Completed responsive navigation menu"

# Log time worked
git commit -m "PROJ-104 #time 2h #comment Implemented contact form validation"

# Combine multiple actions
git commit -m "PROJ-105 #done #time 3h #comment Portfolio homepage complete with hero section"
```

### Jira Integration Setup

1. **Connect repositories:**
   - In Jira, go to Settings → Applications → DVCS accounts
   - Add your GitHub repository
   - Configure Smart Commit settings

2. **Project workflow:**
   - Create Jira epic: "Portfolio Website Development"
   - Break into stories: "Homepage", "About Page", "Projects", etc.
   - Use Smart Commits to update progress automatically

## ⚙️ CI/CD with GitHub Actions

### Setting up the Deployment Pipeline

The repository includes a template GitHub Actions workflow in `.github/workflows/deploy.yml`. 

**Learning approach - build the pipeline step by step:**

1. **Start simple:** Uncomment the basic workflow structure
2. **Add checkout:** Uncomment the checkout step  
3. **Add deployment:** Uncomment the Pages deployment steps
4. **Test and debug:** Push changes and watch the Actions tab

### Complete Workflow Example

Once you understand each step, here's the full `deploy.yml`:

```yaml
name: Build & Deploy Portfolio

on:
  push:
    branches: [ "main" ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Pages
        uses: actions/configure-pages@v5
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Advanced Pipeline Features

As you learn more, enhance your pipeline:

```yaml
# Add HTML validation
- name: Validate HTML
  run: |
    npm install -g html-validate
    html-validate *.html

# Add accessibility testing
- name: Accessibility Check
  uses: pa11y/pa11y-action@v3
  with:
    url: https://${{ github.actor }}.github.io

# Add performance testing
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    uploadArtifacts: true
```

## 📂 Customization Guide

### 1. Personal Information

Replace all placeholder content:
- `index.html`: Update name, title, description
- `about.html`: Add your background, skills, interests  
- `experience.html`: Add internships, jobs, leadership roles
- `education.html`: Update school, GPA, coursework
- `projects.html`: Showcase your best projects

### 2. Images

Add your photos to `assets/images/`:
- `profile-placeholder.jpg` → your professional headshot
- `about-placeholder.jpg` → casual photo for about page
- `project*-placeholder.jpg` → screenshots of your projects
- `company*-placeholder.jpg` → logos of companies/organizations

### 3. Links and Contact

Update all external links:
- Email addresses
- LinkedIn profile
- GitHub username
- Project demo links
- Resume/CV link

### 4. Styling

Customize the design in `style.css`:
- Update CSS variables for colors: `--primary-color`, `--accent-color`
- Modify fonts, spacing, or layout
- Add your own custom components

## 🎯 Learning Outcomes

By completing this project, students will master:

### ✅ Git Fundamentals
- Repository management and history
- Branching and merging strategies
- Conflict resolution
- Remote repository operations
- Rebase vs merge workflows

### ✅ GitHub Workflow
- Pull request process
- Code review practices
- Issue tracking and management
- Collaborative development
- GitHub Pages deployment

### ✅ Jira Integration
- Smart Commit syntax
- Issue lifecycle management
- Agile workflow integration
- Project tracking and reporting

### ✅ CI/CD Pipeline
- GitHub Actions fundamentals
- Automated testing and deployment
- Pipeline debugging and optimization
- Environment management
- Security and permissions

### ✅ Professional Portfolio
- Modern web development practices
- Responsive design principles
- SEO and accessibility basics
- Professional presentation skills

## 🛠 Technical Requirements

- **No frameworks required** - Pure HTML, CSS, JavaScript
- **Responsive design** - Works on all devices
- **Clean code** - Well-commented for learning
- **Accessibility** - WCAG 2.1 compliant
- **Performance** - Fast loading and optimized

## 📋 Project Exercises

### Week 1: Git Basics
- [ ] Clone repository and make first commit
- [ ] Practice branching and merging
- [ ] Resolve a merge conflict
- [ ] Use rebase for clean history

### Week 2: Content Creation
- [ ] Customize all HTML pages with your information
- [ ] Add your projects with descriptions and links
- [ ] Update images and styling
- [ ] Test responsive design

### Week 3: GitHub Workflow
- [ ] Create feature branches for each page
- [ ] Open pull requests with descriptions
- [ ] Practice code review process
- [ ] Manage issues and milestones

### Week 4: CI/CD Pipeline
- [ ] Set up GitHub Actions workflow
- [ ] Deploy to GitHub Pages
- [ ] Add automated testing
- [ ] Monitor and debug deployments

### Week 5: Jira Integration
- [ ] Set up Jira project
- [ ] Practice Smart Commits
- [ ] Track progress with Jira boards
- [ ] Generate project reports

## 🚀 Advanced Challenges

Ready for more? Try these enhancements:

1. **Add a blog section** with markdown support
2. **Implement dark mode** with CSS variables
3. **Add contact form** with form validation
4. **Integrate Google Analytics** for visitor tracking
5. **Add SEO optimization** with meta tags and structured data
6. **Implement PWA features** for offline access
7. **Add automated testing** with Jest or Playwright
8. **Set up staging environment** with multiple branches

## 🐛 Troubleshooting

### Common Git Issues

**Problem:** Merge conflict
```bash
# Solution: Edit conflicted files, then:
git add .
git commit -m "Resolve merge conflict"
```

**Problem:** Accidental commit to main
```bash
# Solution: Create branch from current commit
git branch feature/fix-from-main
git reset --hard HEAD~1
git checkout feature/fix-from-main
```

### GitHub Pages Issues

**Problem:** Site not deploying
- Check repository settings → Pages → Source
- Verify workflow permissions in repository settings
- Check Actions tab for deployment errors

**Problem:** Changes not showing
- Wait 5-10 minutes for deployment
- Clear browser cache
- Check if workflow completed successfully

### Workflow Debugging

**Problem:** Action failing
- Check the Actions tab for detailed logs
- Verify YAML syntax and indentation
- Ensure all required permissions are set
- Check for typos in file paths

## 📚 Additional Resources

### Git Learning
- [Pro Git Book](https://git-scm.com/book) - Complete Git reference
- [Git Branching Interactive](https://learngitbranching.js.org/) - Visual Git learning
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials) - Comprehensive guides

### GitHub Actions
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Awesome Actions](https://github.com/sdras/awesome-actions) - Community actions
- [Action Marketplace](https://github.com/marketplace?type=actions)

### Web Development
- [MDN Web Docs](https://developer.mozilla.org/) - Web standards reference
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [Web.dev](https://web.dev/) - Modern web development best practices

## 🤝 Contributing

Found a bug or want to improve the template? Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/improvement`
3. Make your changes and test thoroughly
4. Submit a pull request with clear description

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Designed for computer science education
- Inspired by modern portfolio best practices
- Built with accessibility and performance in mind
- Optimized for recruiter and hiring manager review

---

**Ready to start your portfolio journey?** Click "Use this template" and begin building your professional online presence while mastering essential development tools! 🚀

**Questions?** Open an issue or reach out to your instructor. Remember: the best way to learn is by doing, so don't be afraid to experiment and make mistakes!