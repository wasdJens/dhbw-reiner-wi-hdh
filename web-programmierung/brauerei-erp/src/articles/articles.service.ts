import { Injectable, NotFoundException } from '@nestjs/common';
import { BreweriesService } from '../breweries/breweries.service';
import { Page, toPage } from '../page.dto';
import { ARTICLES, Article } from './article';
import { ArticleOut } from './dto/article.dto';
import { StockV1 } from './dto/stock-v1.dto';
import { StockV2 } from './dto/stock-v2.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly breweriesService: BreweriesService) {}

  findAll(page: number, breweryNumber?: string): Page<ArticleOut> {
    if (breweryNumber) {
      // Unbekannte Brauerei: 404 BRAUEREI_404
      this.breweriesService.findOne(breweryNumber);
    }
    const articles = breweryNumber
      ? ARTICLES.filter((a) => a.breweryNumber === breweryNumber)
      : ARTICLES;
    return toPage(
      articles.map((a) => ({
        artikel_nr: a.articleNumber,
        bezeichnung: a.name,
        brauerei_nr: a.breweryNumber,
        sorte: a.style,
        alkohol_vol: a.abv,
        preis_cent: a.priceCent,
        geaendert_am: a.changedAt,
      })),
      page,
    );
  }

  findStockV1(articleNumber: string): StockV1 {
    const article = this.findOne(articleNumber);
    return {
      artikel_nr: article.articleNumber,
      bezeichnung: article.name,
      // v1: Summe aller Lagerorte
      bestand: article.stock.reduce((sum, s) => sum + s.bottles, 0),
      // v1: Datum im Format TT.MM.JJJJ
      stand: article.updatedAt.slice(0, 10).split('-').reverse().join('.'),
    };
  }

  findStockV2(articleNumber: string): StockV2 {
    const article = this.findOne(articleNumber);
    return {
      artikel_nr: article.articleNumber,
      bezeichnung: article.name,
      lagerorte: article.stock.map((s) => ({
        name: s.location,
        bestand: s.bottles,
      })),
      aktualisiert_am: article.updatedAt,
    };
  }

  private findOne(articleNumber: string): Article {
    const article = ARTICLES.find((a) => a.articleNumber === articleNumber);
    if (!article) {
      throw new NotFoundException({
        fehler: `Artikel ${articleNumber} unbekannt`,
        code: 'ARTIKEL_404',
      });
    }
    return article;
  }
}
