import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { siFacebook, siInstagram, siYoutube, siX } from 'simple-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  facebookIcon!: SafeHtml;
  instagramIcon!: SafeHtml;
  linkedinIcon!: SafeHtml;
  youtubeIcon!: SafeHtml;
  xIcon!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.facebookIcon = this.sanitizer.bypassSecurityTrustHtml(
      this.stripFill(siFacebook.svg),
    );
    this.instagramIcon = this.sanitizer.bypassSecurityTrustHtml(
      this.stripFill(siInstagram.svg),
    );
    this.youtubeIcon = this.sanitizer.bypassSecurityTrustHtml(
      this.stripFill(siYoutube.svg),
    );
    this.xIcon = this.sanitizer.bypassSecurityTrustHtml(
      this.stripFill(siX.svg),
    );
  }

  private stripFill(svg: string): string {
    return svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
  }
}
