import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export const brightyTranslateModule = TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
    }
});

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
