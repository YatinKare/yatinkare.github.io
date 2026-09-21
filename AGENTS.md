# Blog publishing workflow

1. Read the new Markdown post and correct clear grammatical, spelling, punctuation, and capitalization errors while preserving the author’s voice.
2. Check the YAML header and confirm it has valid values for `title`, `date`, `description`, `hero`, `heroAlt`, `featured`, `draft`, and `substack`.
3. Confirm the filename is the intended URL slug and that the hero image exists at the path referenced by `hero`.
4. Set the new post’s `featured` value to `true` and set the previous featured post’s value to `false`.
5. Store the hero image in `public/images/` so production builds copy it into `docs/images/` and do not remove it.
6. Add the new post URL and its image metadata to both `public/sitemap.xml` and `docs/sitemap.xml`.
7. Run `npm run check`, `npm run build`, and `xmllint --noout public/sitemap.xml docs/sitemap.xml`.
8. Confirm the generated route exists under `docs/blog/`, and confirm the hero image still exists under both `public/images/` and `docs/images/` after the build.
9. Review `git status` and the complete diff. Keep unrelated user changes out of the commit.
10. Create a feature branch, commit the post, image, sitemap, and generated-site changes, push the branch, and open a pull request against `main` with the verification commands in the description.
