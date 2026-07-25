# EduLens - Contributing Guidelines

Dank je wel dat je interesseerd bent in bijdragen aan EduLens! 🎉

## Code of Conduct

- Wees respectvol en vriendelijk
- Accepteer kritieke feedback gracieus
- Focus op wat goed is voor de community

## How to Contribute

### 1. Bugs Melden

1. Ga naar [Issues](https://github.com/MeesterDo-byte/edulens/issues)
2. Klik "New Issue"
3. Kies "Bug Report"
4. Vul in:
   - Beschrijving
   - Reproductiestappen
   - Expected vs actual behavior
   - Screenshots
   - Environment info

### 2. Features Suggereren

1. Ga naar Issues
2. Klik "New Issue"
3. Kies "Feature Request"
4. Beschrijf:
   - Feature concept
   - Use cases
   - Waarom het nodig is

### 3. Code Bijdragen

1. Fork de repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/edulens.git
   cd edulens
   ```

2. Maak feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. Maak je changes
   - Follow code style
   - Add tests if applicable
   - Update documentation

4. Commit changes
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

5. Push naar branch
   ```bash
   git push origin feature/amazing-feature
   ```

6. Open Pull Request
   - Beschrijf je changes
   - Link gerelateerde issues
   - Add before/after screenshots

## Code Style

### TypeScript
- Use strict types
- Avoid `any` type
- Document complex logic

### Formatting
```bash
# Run linter
npm run lint

# Fix issues
npm run lint -- --fix
```

### Naming Conventions
- Components: PascalCase (`Button.tsx`)
- Functions: camelCase (`getUserData()`)
- Constants: UPPER_SNAKE_CASE (`MAX_ATTEMPTS`)
- Files: kebab-case for utilities (`auth-service.ts`)

## Testing

Seek test coverage for new features:

```bash
# Run tests
npm test

# Check coverage
npm run test:coverage
```

## PR Requirements

- ✅ Code follows style guidelines
- ✅ Self-review of own code
- ✅ Comments added for complex logic
- ✅ Documentation updated
- ✅ No new warnings generated
- ✅ Tests added/updated

## Questions?

Kan je iets niet vinden? Open een issue of tag een maintainer!

---

Dankje voor bijdragens! ❤️
